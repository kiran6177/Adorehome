const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Address = require('../models/addressSchema')

const loadPayment = async (req,res)=>{
    try {
        const uid = req.userid
        const addid = req.cookies.addressid
        
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const addData = await Address.findById({_id:addid})
        console.log(addData)
        if(addData!= null)
        {
        res.render('user/payment',{udata:udata,addData:addData})
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadPayment
}