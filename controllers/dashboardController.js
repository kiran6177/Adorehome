const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')

const filter = require('../utils/cronFilter')

const weekReport = async (req,res)=>{
    try {
        const weekLimits =  filter.weekly()
        console.log(weekLimits)
        const firstWeekDet = await Order.aggregate([{$match:{date:{$gte:weekLimits.firstWeek,$lt:weekLimits.secondWeek}}},{$project:{_id:0,total_amount:1}},{$group:{_id:null,total_amount:{$sum:'$total_amount'}}},{$project:{_id:0,total_amount:1}}])
        const secondWeekDet = await Order.aggregate([{$match:{date:{$gte:weekLimits.secondWeek,$lt:weekLimits.thirdWeek}}},{$project:{_id:0,total_amount:1}},{$group:{_id:null,total_amount:{$sum:'$total_amount'}}},{$project:{_id:0,total_amount:1}}])
        const thirdWeekDet = await Order.aggregate([{$match:{date:{$gte:weekLimits.thirdWeek,$lt:weekLimits.fourthWeek}}},{$project:{_id:0,total_amount:1}},{$group:{_id:null,total_amount:{$sum:'$total_amount'}}},{$project:{_id:0,total_amount:1}}])
        const fourthWeekDet = await Order.aggregate([{$match:{date:{$gte:weekLimits.fourthWeek,$lt:weekLimits.fifthWeek}}},{$project:{_id:0,total_amount:1}},{$group:{_id:null,total_amount:{$sum:'$total_amount'}}},{$project:{_id:0,total_amount:1}}])


        let first = 0,second = 0,third = 0 ,fourth = 0
        if(firstWeekDet[0]!== undefined)
        {
            first = firstWeekDet[0].total_amount
        }
        if(secondWeekDet[0]!== undefined)
        {
            second = secondWeekDet[0].total_amount
        } if(thirdWeekDet[0]!== undefined)
        {
            third = thirdWeekDet[0].total_amount
        } if(fourthWeekDet[0]!== undefined)
        {
            fourth = fourthWeekDet[0].total_amount
        }
        const weekDataToChart = [first,second,third,fourth]
        // console.log(weekDataToChart)
        if(weekDataToChart)
        {
            res.json({weekData:weekDataToChart})
        }
        else{
            res.json({err:"Error in weekdata"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const monthReport = async (req,res)=>{
    try {
        const monthdata = filter.monthly()

        console.log(monthdata)
        let monthdetails = []

        for(let i = 0; i< monthdata.length;i++)
        {
            const currentData = await Order.aggregate([{$match:{date:{$gte:monthdata[i].monthStart,$lt:monthdata[i].monthEnd}}},{$project:{_id:0,total_amount:1}},{$group:{_id:null,total_amount:{$sum:'$total_amount'}}},{$project:{_id:0,total_amount:1}}])
            
            monthdetails.push({
                month:monthdata[i].monthName,
                amount:currentData[0]?currentData[0].total_amount : 0
            })
        }
         console.log(monthdetails)
        if(monthdetails.length > 0 )
        {
            res.json({monthdata:monthdetails})
        }
        else{
            res.json({montherror:"Cannot fetch MonthData"})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const yearReport = async (req,res)=>{
    try {
        const yearLimits = filter.yearly()
        // console.log(yearLimits)

        let yeardata = []

        for(let i = 0;i < yearLimits.length;i++)
        {
            const yeardatas = await Order.aggregate([{$match:{date:{$gte:yearLimits[i].yearStart,$lt:yearLimits[i].yearEnd}}},{$project:{_id:0,total_amount:1}},{$group:{_id:null,total_amount:{$sum:'$total_amount'}}},{$project:{_id:0,total_amount:1}}])
            
            yeardata.push({
                year:2023 + i,
                amount:yeardatas[0] ? yeardatas[0].total_amount : 0
            })
        }
        
        if(yeardata.length > 0)
        {
            res.json({yeardata:yeardata})
        }
        else{
            res.json({yearerr:"Cannot fetch year data"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const categorySales = async (req,res)=>{
    try {
        const catData = await Order.aggregate([{$unwind:'$products'},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'productDetails'}},{$unwind:'$productDetails'},{$lookup:{from:'categories',localField:'productDetails.category_id',foreignField:'_id',as:'category'}},{$unwind:'$category'},{$group:{_id:'$category.categoryname',amount:{$sum:"$total_amount"}}},{$sort:{amount:-1}}])
        // console.log(catData)
        if(catData)
        {
            res.json({catData:catData})
        }
        else{
            res.json({caterr:"Category Data not available"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const propage = async (req,res)=>{
    try {
        let propage = 0
        const propagesize = 8
        if(req.query.page)
        {
            propage = req.query.page
        }
        else{
            propage = 1
        }

    const proSold = await Order.aggregate([{$match:{payment_status:"Paid"}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$skip:(propage -1)*propagesize},{$limit:propagesize}])
    if(proSold.length > 0)
    {
        res.json({proSold:proSold})
    }
    else{
        res.json({proerr:"NO PROducts"})
    }
        
    } catch (error) {
        console.log(error.message)
    }
}

const stockPage = async (req,res)=>{
    try {
        const {page} = req.query
    const prodet = await Product.aggregate([{$match:{isBlocked:0}},{$sort:{date:-1}},{$skip:(page - 1)*8},{$limit:8}])
        if(prodet.length > 0)
        {
            res.json({products:prodet})
        }
        else{
            res.json({stocknot:"NO STOCK"})
        }
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    weekReport,
    monthReport,
    yearReport,
    categorySales,
    propage,
    stockPage
}