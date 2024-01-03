const User = require('../models/userSchema')
const Room = require('../models/roomSchema')


const loadRoom = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const rdata = await Room.find({status:"1"})
        if(rdata.length > 0)
        {
            res.render('user/room',{udata:udata,rdata:rdata})
        }
        else{
            console.log("error in roomfetch");
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadRoom
}