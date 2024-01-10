const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Address = require('../models/addressSchema')
const Order = require('../models/orderSchema')

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
        const {paymethod} = req.body
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
        

        const orderdata = {
            date:Date.now(),
            user_id:uid,
            address_id:addid,
            products:products,
            payment_method:paymethod,
            total_amount:total
        }
        const orderSaved = await Order.create(orderdata)
        console.log(orderSaved)
        if(orderSaved!= null)
        {

            for(let j = 0 ; j < products.length ; j++)
            {
                const udel = await User.findOneAndUpdate({_id:uid},{$pull:{cart:{product_id:products[j].product_id}}})
                // console.log(udel)
                const stockreduc = await Product.findByIdAndUpdate({_id:products[j].product_id},{$inc:{stock:-products[j].qty}})
            }
            res.redirect(`/ordered?id=${orderSaved._id}`)
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadPayment,
    paymentConfirm
}