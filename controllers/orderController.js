const Order = require('../models/orderSchema')

const loadOrder = async (req,res)=>{
    try {
        const orderdata = await Order.find().populate('user_id')
        res.render('admin/adminorders',{orderdata:orderdata})
    } catch (error) {
        console.log(error.message)
    }
}

const loadOrderDetail = async (req,res)=>{
    try {
        const orderid = req.query.id
        const orderdetail = await Order.findById({_id:orderid}).populate('products.product_id user_id address_id')
        if(orderdetail!=null)
        {
            res.render("admin/adminorderdetail",{orderdetail:orderdetail})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const changeStatus = async (req,res)=>{
    try {

        const {id,val} = req.query
        const orderdata = await Order.findByIdAndUpdate({_id:id},{$set:{status:val}},{new:true})
        if(orderdata!=null)
        {
        res.json({data:"Order status changed."})
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadOrder,
    loadOrderDetail,
    changeStatus
}