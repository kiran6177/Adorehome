const User = require('../models/userSchema')
const Address = require('../models/addressSchema')

const loadCheckout = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const addData = await Address.find({user_id:uid})

        if(addData)
        {
            res.render('user/checkout',{udata:udata,addData:addData})
        }
        else{
            console.log("Error in address")
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadCheckout
}