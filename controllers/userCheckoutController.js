const User = require('../models/userSchema')
const Address = require('../models/addressSchema')
const Category = require('../models/categorySchema')
const Room = require('../models/roomSchema')

const loadCheckout = async (req,res)=>{
    try {
        const uid = req.userid
        let footcdata = await Category.aggregate([{$match:{status:"1",isListed:0}},{$limit:4}])
        let footrdata = await Room.aggregate([{$match:{status:"1"}},{$limit:4}])
        const udata = await User.findById({_id:uid}).populate({path:'cart.product_id',populate:{path:'offer_id',model:'offer'} })
        const addData = await Address.find({user_id:uid})

        if(addData)
        {
            res.render('user/checkout',{footcdata,footrdata,udata:udata,addData:addData})
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