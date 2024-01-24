const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')

const loadReport = async (req,res)=>{
    try {
    const proSold = await Order.aggregate([{$match:{payment_status:"Paid"}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$limit:8}])
    const totPro =  await Order.aggregate([{$match:{payment_status:"Paid"}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$count:'proCount'}])
    console.log(totPro[0].proCount)
    const totalProducts = await Order.aggregate([{$unwind:'$products'},{$group:{_id:null,quantity:{$sum:'$products.qty'}}}])
    const totalUsers = await User.aggregate([{$match:{type:'user'}},{$count:'users'}])
    const totalOrders = await Order.aggregate([{$match:{payment_status:"Paid"}},{$count:"orders"}])
    const totalRevenue = await Order.aggregate([{$group:{_id:null,total:{$sum:'$total_amount'}}}])
    // console.log(totalRevenue)
        res.render('admin/adminsalesreport',{prosold:proSold,totalProducts:totalProducts[0].quantity,totalUsers:totalUsers[0].users,totalOrders:totalOrders[0].orders,totalRevenue:totalRevenue[0].total,totPro:totPro[0].proCount})
    } catch (error) {
        console.log(error.message)
    }
}

const dailyProducts = async (req,res)=>{
    try {
        const {day,month,year} = req.query
        let page = req.query.page ? req.query.page : 1
        
        let day1 = day ? parseInt(day) : null
        let month1 = month ? parseInt(month) - 1 : null
        let year1 = year ? parseInt(year) : null
        let proSold 
        let proSoldCount
        if(day1===null ||month1 === null || year1 === null)
        {
          proSold = await Order.aggregate([{$match:{payment_status:"Paid"}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$skip:(page - 1)*8},{$limit:8}])
          proSoldCount = await Order.aggregate([{$match:{payment_status:"Paid"}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$count:'procount'}])


        }
        else{
        console.log(day1,month1,year1)
        const date = new Date(year1,month1,day1+1)
        const start = new Date(date)
        start.setUTCHours(0,0,0,0)
        const end = new Date(start)
        end.setDate(end.getDate()+1)
        console.log(start,end)

          proSold = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:start,$lt:end}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$skip:(page - 1)*8},{$limit:8}])
          proSoldCount = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:start,$lt:end}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$count:'procount'}])

        // console.log(proSold)
        }
         console.log(proSoldCount)
        
        if(proSold)
        {
            res.json({proSold,procount:proSoldCount.length > 0 ?proSoldCount[0].procount : 0})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const weeklyProducts = async (req,res)=>{
    try {
        const {week,month,year} = req.query
        let page = req.query.page ? req.query.page : 1
        console.log(week,month,year)
        let week1 = week ? parseInt(week) : null
        let month1 = month ? parseInt(month)  : null
        let year1 = year ? parseInt(year) : null
        
        function getWeekDetails(week)
        {
            
            const firstday = new Date(year1,month1,1)
            firstday.setUTCHours(0,0,0,0)
            const startDay = new Date(firstday)
            startDay.setDate((week - 1)*7 + 1)
            const endDay = new Date(startDay)
            if(week1 === 4)
            {   
                if(month1 == 0 || month1 == 2 || month1 == 4 || month1 == 6 || month1 == 7 || month1 == 9 || month1 == 11)
                {
                    endDay.setDate(startDay.getDate()+9)
                }
                else if(month1 == 3 || month1 == 5 || month1 == 8 || month1 == 10){
                    endDay.setDate(startDay.getDate()+8)
                }
                else 
                {
                    if(year1%100 !== 0 && year1%4 == 0)
                    {
                        endDay.setDate(startDay.getDate()+7)
                    }
                    else{
                        endDay.setDate(startDay.getDate()+6)
                    }
                }
            }
            else{
                endDay.setDate(startDay.getDate()+7)
            }
        
            return {startDay,endDay}
        }
        const {startDay,endDay} = getWeekDetails(week1)
        console.log(startDay,endDay)
        proSold = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$skip:(page - 1)*8},{$limit:8}])
        proSoldCount = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$count:'procount'}])
        console.log(proSold)
        console.log(proSoldCount)
        if(proSold.length > 0)
        {
        res.json({proSold:proSold , procount:proSoldCount ? proSoldCount[0].procount : 8})
        }
        else{
        res.json({proerr:"NO PRODUCTS AVAILABLE"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const monthlyProducts = async (req,res)=>{
    try {
        const {month,year} = req.query
        console.log(month,year)
        let page = req.query.page ? req.query.page : 1
        let month1 = month ? parseInt(month) - 1 : null
        let year1 = year ? parseInt(year) : null
        console.log("pg"+page)
        function getMonthDetails(month1)
        {
                
                const date = new Date(year1,month1 + 1)
                date.setUTCDate(1)
                date.setUTCHours(0,0,0,0)
                const startDay = new Date(date)
                let endDay = new Date(startDay)
                if(month1 == 0 || month1 == 2 || month1 == 4 || month1 == 6 || month1 == 7 || month1 == 9 || month1 == 11)
                {
                     endDay.setDate(31)
                }
                else if(month1 == 3 || month1 == 5 || month1 == 8 || month1 == 10){
                     endDay.setDate(30)
                }
                else 
                {
                    if(year1%100 !== 0 && year1%4 == 0)
                    {
                         endDay.setDate(29)
                    }
                    else{
                         endDay.setDate(28)
                    }
                }
   
            console.log(startDay)
            console.log(endDay)
            return {startDay,endDay}
        }
        const {startDay,endDay} = getMonthDetails(month1)
        proSold = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$skip:(page - 1)*8},{$limit:8}])
        proSoldCount = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$count:'procount'}])
        console.log(proSold)
        console.log(proSoldCount)
        if(proSold.length > 0)
        {
            res.json({proSold:proSold,procount:proSoldCount ? proSoldCount[0].procount : 8})
        }
        else{
            res.json({proerr:"NO PRODUCTS AVAILABLE"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const yearlyProducts = async (req,res)=>{
    try {
        const {year} = req.query
        let page = req.query.page ? req.query.page : 1
        let year1 = year ? parseInt(year) : null
        console.log(year1)
        function getYearData(year1)
        {
            const date = new Date(year1,1)
            date.setUTCDate(1)
            date.setUTCHours(0,0,0,0)
            let startDay = date
            let endDay = new Date(startDay)
            endDay.setFullYear(startDay.getFullYear() + 1)
            console.log(startDay)
            console.log(endDay)
            return {startDay,endDay}
        }
        const {startDay,endDay} = getYearData(year1)
        proSold = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$skip:(page - 1)*8},{$limit:8}])
        proSoldCount = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'userdetails'}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'prodetails'}},{$sort:{date:-1}},{$count:'procount'}])
        console.log(proSold)
        console.log(proSoldCount)
        if(proSold.length > 0)
        {
            res.json({proSold:proSold,procount:proSoldCount ? proSoldCount[0].procount : 8})

        }
        else{
            res.json({proerr:"NO PRODUCTS AVAILABLE"})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const dailyTurnover = async (req,res)=>{
    try {
        const {day,month,year} = req.query
        let day1 = day ? parseInt(day) : null
        let month1 = month ? parseInt(month) - 1 : null
        let year1 = year ? parseInt(year) : null
        console.log(day1,month1,year1)
        const date = new Date(year1,month1,day1+1)
        const start = new Date(date)
        start.setUTCHours(0,0,0,0)
        const end = new Date(start)
        end.setDate(end.getDate()+1)
        console.log(start,end)
        const totalProducts = await Order.aggregate([{$match:{date:{$gte:start,$lt:end}}},{$unwind:'$products'},{$group:{_id:null,quantity:{$sum:'$products.qty'}}}])
        const totalUsers = await User.aggregate([{$match:{type:'user',date:{$gte:start,$lt:end}}},{$count:'users'}])
        const totalOrders = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:start,$lt:end}}},{$count:"orders"}])
        const totalRevenue = await Order.aggregate([{$match:{date:{$gte:start,$lt:end}}},{$group:{_id:null,total:{$sum:'$total_amount'}}}])
        res.json({totalOrders:totalOrders.length > 0 ? totalOrders[0].orders : 0 , totalProducts: totalProducts.length > 0 ? totalProducts[0].quantity : 0 , totalRevenue : totalRevenue.length > 0 ? totalRevenue[0].total : 0 , totalUsers : totalUsers.length > 0 ? totalUsers[0].users : 0})
    } catch (error) {
        console.log(error.message)
    }
}

const weeklyTurnover = async (req,res)=>{
    try {
        const {week,month,year} = req.query
        let week1 = week ? parseInt(week) : null
        let month1 = month ? parseInt(month)  : null
        let year1 = year ? parseInt(year) : null
        console.log(week1,month1,year1)
        function getWeekDetails(week)
        {
            
            const firstday = new Date(year1,month1,1)
            firstday.setUTCHours(0,0,0,0)
            const startDay = new Date(firstday)
            startDay.setDate((week - 1)*7 + 1)
            const endDay = new Date(startDay)
            let month2 = month1 - 1
            if(week1 === 4)
            {   
                if(month2 == 0 || month2 == 2 || month2 == 4 || month2 == 6 || month2 == 7 || month2 == 9 || month2 == 11)
                {
                    endDay.setDate(startDay.getDate()+9)
                }
                else if(month2 == 3 || month2 == 5 || month2 == 8 || month2 == 10){
                    endDay.setDate(startDay.getDate()+8)
                }
                else 
                {
                    if(year1%100 !== 0 && year1%4 == 0)
                    {
                        endDay.setDate(startDay.getDate()+7)
                    }
                    else{
                        endDay.setDate(startDay.getDate()+6)
                    }
                }
            }
            else{
                endDay.setDate(startDay.getDate()+7)
            }
            return {startDay,endDay}
        }
        const {startDay,endDay} = getWeekDetails(week1)
        const totalProducts = await Order.aggregate([{$match:{date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$group:{_id:null,quantity:{$sum:'$products.qty'}}}])
        const totalUsers = await User.aggregate([{$match:{type:'user',date:{$gte:startDay,$lt:endDay}}},{$count:'users'}])
        const totalOrders = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$count:"orders"}])
        const totalRevenue = await Order.aggregate([{$match:{date:{$gte:startDay,$lt:endDay}}},{$group:{_id:null,total:{$sum:'$total_amount'}}}])
        res.json({totalOrders:totalOrders.length > 0 ? totalOrders[0].orders : 0 , totalProducts: totalProducts.length > 0 ? totalProducts[0].quantity : 0 , totalRevenue : totalRevenue.length > 0 ? totalRevenue[0].total : 0 , totalUsers : totalUsers.length > 0 ? totalUsers[0].users : 0})
    } catch (error) {
        console.log(error.message)
    }
}

const monthlyTurnover = async (req,res)=>{
    try {
        const {month,year} = req.query
        let month1 = month ? parseInt(month) - 1 : null
        let year1 = year ? parseInt(year) : null
        function getMonthDetails(month1)
        {
                
                const date = new Date(year1,month1 + 1)
                date.setUTCDate(1)
                date.setUTCHours(0,0,0,0)
                const startDay = new Date(date)
                let endDay = new Date(startDay)
                if(month1 == 0 || month1 == 2 || month1 == 4 || month1 == 6 || month1 == 7 || month1 == 9 || month1 == 11)
                {
                     endDay.setDate(31)
                }
                else if(month1 == 3 || month1 == 5 || month1 == 8 || month1 == 10){
                     endDay.setDate(30)
                }
                else 
                {
                    if(year1%100 !== 0 && year1%4 == 0)
                    {
                         endDay.setDate(29)
                    }
                    else{
                         endDay.setDate(28)
                    }
                }
   

            return {startDay,endDay}
        }
        const {startDay,endDay} = getMonthDetails(month1)
        const totalProducts = await Order.aggregate([{$match:{date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$group:{_id:null,quantity:{$sum:'$products.qty'}}}])
        const totalUsers = await User.aggregate([{$match:{type:'user',date:{$gte:startDay,$lt:endDay}}},{$count:'users'}])
        const totalOrders = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$count:"orders"}])
        const totalRevenue = await Order.aggregate([{$match:{date:{$gte:startDay,$lt:endDay}}},{$group:{_id:null,total:{$sum:'$total_amount'}}}])
        res.json({totalOrders:totalOrders.length > 0 ? totalOrders[0].orders : 0 , totalProducts: totalProducts.length > 0 ? totalProducts[0].quantity : 0 , totalRevenue : totalRevenue.length > 0 ? totalRevenue[0].total : 0 , totalUsers : totalUsers.length > 0 ? totalUsers[0].users : 0})
    } catch (error) {
        console.log(error.message)
    }
}

const yearlyTurnover = async (req,res)=>{
    try {
        const {year} = req.query
        let year1 = year ? parseInt(year) : null
        function getYearData(year1)
        {
            const date = new Date(year1,1)
            date.setUTCDate(1)
            date.setUTCHours(0,0,0,0)
            let startDay = date
            let endDay = new Date(startDay)
            endDay.setFullYear(startDay.getFullYear() + 1)

            return {startDay,endDay}
        }
        const {startDay,endDay} = getYearData(year1)
        const totalProducts = await Order.aggregate([{$match:{date:{$gte:startDay,$lt:endDay}}},{$unwind:'$products'},{$group:{_id:null,quantity:{$sum:'$products.qty'}}}])
        const totalUsers = await User.aggregate([{$match:{type:'user',date:{$gte:startDay,$lt:endDay}}},{$count:'users'}])
        const totalOrders = await Order.aggregate([{$match:{payment_status:"Paid",date:{$gte:startDay,$lt:endDay}}},{$count:"orders"}])
        const totalRevenue = await Order.aggregate([{$match:{date:{$gte:startDay,$lt:endDay}}},{$group:{_id:null,total:{$sum:'$total_amount'}}}])
        res.json({totalOrders:totalOrders.length > 0 ? totalOrders[0].orders : 0 , totalProducts: totalProducts.length > 0 ? totalProducts[0].quantity : 0 , totalRevenue : totalRevenue.length > 0 ? totalRevenue[0].total : 0 , totalUsers : totalUsers.length > 0 ? totalUsers[0].users : 0})

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadReport,
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
    dailyTurnover,
    weeklyTurnover,
    monthlyTurnover,
    yearlyTurnover
}
