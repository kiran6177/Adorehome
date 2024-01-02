const Category = require('../models/categorySchema')
const User = require('../models/userSchema')


const loadCategory = async (req,res)=>{
    const uid = req.userid
    const udata = await User.findById({_id:uid}).populate('cart.product_id')
    const catData = await Category.find({status:"1"}) 
    res.render('user/category',{catdata:catData,udata:udata})
}

module.exports = {
    loadCategory
}