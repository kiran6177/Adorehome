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
        const orderid = req.query.id
        const cancelData = await Order.findByIdAndUpdate({_id:orderid},{$set:{status:"Cancelled"}})
        if(cancelData!=null)
        {
        const stockupdate = await Order.findById({_id:orderid}).populate('products.product_id')
            if(stockupdate)
            {
                let prolist = stockupdate.products
                for(let i = 0; i < prolist.length ;i++){
                    console.log(prolist[i])
                    const incstock = await Product.findByIdAndUpdate({_id:prolist[i].product_id._id},{$inc:{stock:prolist[i].qty}})
                    
                }
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