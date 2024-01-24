const Brand = require('../models/brandSchema')
const User = require('../models/userSchema')

const loadBrands = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const branddata = await Brand.find()
        console.log(branddata)
        res.render('user/brands',{udata:udata,branddata:branddata})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadBrands
}