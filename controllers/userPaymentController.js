const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Address = require('../models/addressSchema')
const Order = require('../models/orderSchema')
const mongoose = require('mongoose')
const RazorPay = require('../utils/razorpay')

const loadPayment = async (req,res)=>{
    try {
        const uid = req.userid
        const addid = req.cookies.addressid
        const prodet = req.cookies.prodet ? JSON.parse(req.cookies.prodet) : []
        let products = []
        prodet.forEach(el=>{
            let obj = {
                product_id: el.split(',')[0],
                qty:el.split(',')[1]
            }
            products.push(obj)
        })
        let proext = []
        for(let i = 0;i < products.length; i++)
        {
            let data = await Product.findById({_id:products[i].product_id}).populate({path:'category_id',match:{status:"1"}})
            if(data.category_id !== null)
            {
                proext.push({
                    product_id:data,
                    qty:products[i].qty
                })
            }
            
        }
        //  console.log(proext)
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        
        const addData = await Address.findById({_id:addid})
        // console.log(addData)
        if(addData!= null)
        {
        res.render('user/payment',{udata:udata,addData:addData,proext:proext})
        }
    } catch (error) {
        console.log(error.message)
    }
}


const paymentConfirm = async (req,res)=>{
    try {
        const uid = req.userid
        const {paymethod} = req.query
        const addid = req.cookies.addressid
        const prodet = req.cookies.prodet ? JSON.parse(req.cookies.prodet) : []
        let products = []
        prodet.forEach(el=>{
            let obj = {
                product_id: el.split(',')[0],
                qty:el.split(',')[1]
            }
            products.push(obj)
        })
        let totarray = []
        for(let i = 0;i < products.length; i++)
        {
            let data = await Product.findById({_id:products[i].product_id})
            let pertot = data.price * products[i].qty
            totarray.push(pertot)
        }
        const total = totarray.reduce((acc,curr)=>acc+curr)

        let paystatus

        if(paymethod==="COD")
        {
            paystatus = "Paid"
        }
        else{
            paystatus = "Pending"
        }

        const orderdata = {
            date:Date.now(),
            user_id:uid,
            address_id:addid,
            products:products,
            payment_method:paymethod,
            payment_status:paystatus,
            total_amount:total
        }
        const orderSaved = await Order.create(orderdata)

        async function deleteOrder(orderid)
        {
            try {
                const orderIsPaid = await Order.findById({_id:orderid})
                console.log("Deleting Order")
                console.log(orderIsPaid)
                if(orderIsPaid && orderIsPaid.payment_status === "Pending")
                {
                    const orderDelete = await Order.findByIdAndDelete({_id:orderid})
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        setTimeout(()=>deleteOrder(orderSaved._id),300000)
        console.log(orderSaved)
        if(orderSaved!= null)
        {

            for(let j = 0 ; j < products.length ; j++)
            {
                const udel = await User.findOneAndUpdate({_id:uid},{$pull:{cart:{product_id:products[j].product_id}}})
                // console.log(udel)
                const stockreduc = await Product.findByIdAndUpdate({_id:products[j].product_id},{$inc:{stock:-products[j].qty}})
            }
            if(orderSaved.payment_method === "COD")
            {
                res.json({cod:orderSaved._id})
            }
            else if(orderSaved.payment_method === "RazorPay")
            {
                const razorOrderId = await RazorPay.createPayOrder(orderSaved._id,orderSaved.total_amount)
                console.log(razorOrderId)
                const addOrderid = await Order.findByIdAndUpdate({_id:orderSaved._id},{$set:{order_id:razorOrderId.id}},{new:true})
                console.log(addOrderid.order_id)
                const udata = await User.aggregate([{$match:{_id:new mongoose.Types.ObjectId(uid)}}])
                console.log(udata)
                 res.json({razorpay:{id:razorOrderId.id,amount:razorOrderId.amount,userdata:udata[0],orderId:orderSaved._id}})
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

const verifyPayment = async (req,res)=>{
    try {
        const {razorPayId,razorOrderId,razorSignature,realOrderID} = req.body
        console.log(razorPayId,razorOrderId,razorSignature,realOrderID)
        const { createHmac } = require('node:crypto');

        const orderdata = await Order.findById({_id:realOrderID}) 
        const secret = process.env.key_secret;
        const hash = createHmac('sha256', secret)
                    .update(orderdata.order_id + "|" + razorPayId)
                    .digest('hex');
        console.log(hash);
        if(hash === razorSignature)
        {
            const updateStatus = await Order.findByIdAndUpdate({_id:realOrderID},{$set:{payment_status:"Paid",payment_id:razorPayId}})
            // console.log(updateStatus)
            console.log("Success")
            res.json({success:realOrderID})
        }
        else{
            console.log("Failure")
            res.json({failure:realOrderID})
        }
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    loadPayment,
    paymentConfirm,
    verifyPayment
}