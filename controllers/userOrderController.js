const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')

const loadOrdered = async (req,res)=>{
    try {
        const uid = req.userid
        const orderid = req.query.id
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const orderdata = await Order.findById({_id:orderid}).populate('products.product_id')
        if(orderdata!= null)
        {
        res.render('user/ordered',{udata:udata,orderdata:orderdata})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadOrders = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const orderdata = await Order.find({user_id:uid}).populate('products.product_id')
        // console.log(orderdata)
        if(orderdata.length > 0)
        {
        res.render('user/orders',{udata:udata,orderdata:orderdata})
        }
        else{
        res.render('user/orders',{err:"No Orders Added!!"})

        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadSummary = async (req,res)=>{
    try {
        const uid = req.userid
        const orderid = req.query.id
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const orderdata = await Order.findById({_id:orderid}).populate('products.product_id address_id')
        console.log(orderdata.address_id)
        if(orderdata!= null)
        {
        res.render("user/ordersummary",{udata:udata,orderdata:orderdata})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const cancelOrder = async (req,res)=>{
    try {
        const {oid,pid} = req.query
        console.log(oid,pid)
        const cancelData = await Order.findOneAndUpdate({_id:oid},{$pull:{products:{product_id:pid}}})
        console.log(cancelData)
        if(cancelData!=null)
        {   console.log(cancelData)
            let qtytoupdate = 0
            cancelData.products.forEach(el=>{
                if(el.product_id == pid)
                {   console.log(el.qty)
                    qtytoupdate = el.qty
                }
            })
            console.log(qtytoupdate)
            if(cancelData.products.length <= 1)
            {
                const orderDelete = await Order.findByIdAndDelete({_id:oid})
            }
            else{
                const amountUpdate = await Order.findById({_id:oid}).populate('products.product_id')
                console.log(amountUpdate)
                let totalarray = []
                for(let i = 0;i < amountUpdate.products.length ; i++)
                {
                    const totvalue = amountUpdate.products[i].product_id.price * amountUpdate.products[i].qty
                    totalarray.push(totvalue)
                }
            
                const totamount = totalarray.reduce((acc,curr)=>acc+curr)
                console.log(totamount)
                const UpdateTotal = await Order.findByIdAndUpdate({_id:oid},{$set:{total_amount:totamount}})
            }

            const stockUpdate = await Product.findByIdAndUpdate({_id:pid},{$inc:{stock:qtytoupdate}})
                if(stockUpdate!=null)
                {
                res.json({data:"Order Cancelled!!"})
                }
                else{
                res.json({err:"Cannot Cancel Order!!"})
                }                 
            
        }
        else{
            res.json({err:"Cannot Cancel Order!!"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadOrdered,
    loadOrders,
    loadSummary,
    cancelOrder
}