const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')

const loadReport = async (req,res)=>{
    try {
    const proSold = await Order.aggregate([{$match:{payment_status:"Paid"}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}}])

    const totalProducts = await Order.aggregate([{$unwind:'$products'},{$group:{_id:null,quantity:{$sum:'$products.qty'}}}])
    const totalUsers = await User.aggregate([{$match:{type:'user'}},{$count:'users'}])
    const totalOrders = await Order.aggregate([{$match:{payment_status:"Paid"}},{$count:"orders"}])
    const totalRevenue = await Order.aggregate([{$group:{_id:null,total:{$sum:'$total_amount'}}}])
    // console.log(totalRevenue)
        res.render('admin/adminsalesreport',{prosold:proSold,totalProducts:totalProducts[0].quantity,totalUsers:totalUsers[0].users,totalOrders:totalOrders[0].orders,totalRevenue:totalRevenue[0].total})
    } catch (error) {
        console.log(error.message)
    }
}

const dailyProducts = async (req,res)=>{
    try {
        const {day,month,year} = req.query
        let day1 = parseInt(day) 
        let month1 = parseInt(month) - 1
        let year1 = parseInt(year)
        console.log(day1,month1,year1)
        const date = new Date(year1,month1,day1)
        const start = new Date(date)
        start.setUTCHours(0,0,0,0)
        const end = new Date(start)
        end.setDate(end.getDate()+1)
        // console.log(start,end)
         const proSold = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:start,$lt:end}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}}])
        // console.log(proSold)
        if(proSold)
        {
            res.json({proSold})
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadReport,
    dailyProducts

}
