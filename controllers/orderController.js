const { promiseImpl } = require('ejs')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')
const Coupon = require('../models/couponSchema')
const { ObjectId } = require('mongodb')

const loadOrder = async (req,res)=>{
    try {
        const orderdata = await Order.find({payment_status:"Paid"}).populate('user_id')
        res.render('admin/adminorders',{orderdata:orderdata})
    } catch (error) {
        console.log(error.message)
    }
}

const loadOrderDetail = async (req,res)=>{
    try {
        const orderid = req.query.id
        const orderdetail = await Order.findById({_id:orderid}).populate('products.product_id user_id address_id')
        let discount = 0
        if(orderdetail.coupon_id && orderdetail.coupon_id != "Nil"){
            const coupondata = await Coupon.aggregate([{$match:{_id:new ObjectId(orderdetail.coupon_id)}}])
            discount = coupondata[0].reductionrate
        }
        if(orderdetail!=null)
        {
            res.render("admin/adminorderdetail",{orderdetail:orderdetail,discount})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const changeStatus = async (req,res)=>{
    try {

        const {id,val,proid} = req.query
        console.log(req.query.proid)
        const orderdata = await Order.findOneAndUpdate({_id:id,'products.product_id':proid},{$set:{'products.$.status':val}},{new:true})
        console.log(orderdata)
        if(val === "Cancelled"){
                let qtytoupdate = 0
                orderdata.products.forEach(el=>{
                    if(el.product_id == proid && el.status == "Cancelled"){
                        qtytoupdate = el.qty
                    }
                })
                let tot = 0
                let productdet = await Product.findById({_id:proid})
                if(productdet){
                    tot = productdet.price
                }
                let totamount = orderdata.total_amount - (tot * qtytoupdate)
                console.log(totamount)
                if(orderdata.coupon_id != "Nil"){
                    const coupondet = await Coupon.aggregate([{$match:{_id:new ObjectId(orderdata.coupon_id)}}])
                    if(coupondet.length > 0){
                        if(coupondet[0].couponlimit > totamount){
                            totamount = totamount + coupondet[0].reductionrate
                        }
                    }
                }
                console.log(qtytoupdate)
                const UpdateTotal = await Order.findByIdAndUpdate({_id:id},{$set:{total_amount:totamount}})
                const stockUpdate = await Product.findByIdAndUpdate({_id:proid},{$inc:{stock:qtytoupdate}})
                if(stockUpdate){
                    console.log('Stock Updated')
                }
        }
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