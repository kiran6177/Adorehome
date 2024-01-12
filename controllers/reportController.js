const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')

const loadReport = async (req,res)=>{
    try {
        res.render('admin/adminsalesreport')
    } catch (error) {
        console.log(error.message)
    }
}

const weekReport = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadReport,
    
}
