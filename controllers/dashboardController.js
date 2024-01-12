const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')

const filter = require('../utils/cronFilter')

const weekReport = async (req,res)=>{
    try {
        const weekLimit =  filter.currentWeek()
        console.log(weekLimit);
    } catch (error) {
        console.log(error.message)
    }
}

const monthReport = async (req,res)=>{
    try {
        const monthLimit = filter.currentMonth()
        console.log(monthLimit)

        const userCount = await User.aggregate([{$match:{date:{$gte:monthLimit.start,$lt:monthLimit.end}}},{$count:'users'}])
        console.log(userCount[0].users.toString())
    } catch (error) {
        console.log(error.message)
    }
}

const yearReport = async (req,res)=>{
    try {
        const yearLimit = filter.currentYear()
        console.log(yearLimit)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    weekReport,
    monthReport,
    yearReport
}