const User = require('../models/userSchema')
const Category = require('../models/categorySchema')
const Room = require('../models/roomSchema')
const Product = require('../models/productSchema')
const { ObjectId } = require('bson')


const loadRoom = async (req,res)=>{
    try {
        const uid = req.userid
        let footcdata = await Category.aggregate([{$match:{status:"1",isListed:0}},{$limit:4}])
        let footrdata = await Room.aggregate([{$match:{status:"1"}},{$limit:4}])
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const rdata = await Room.find({status:"1"})
        if(rdata.length > 0)
        {
            res.render('user/room',{footcdata,footrdata,udata:udata,rdata:rdata})
        }
        else{
            console.log("error in roomfetch");
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadRoomProducts = async (req,res)=>{
    try {
        const {id} = req.query
        const uid = req.userid
        let footcdata = await Category.aggregate([{$match:{status:"1",isListed:0}},{$limit:4}])
        let footrdata = await Room.aggregate([{$match:{status:"1"}},{$limit:4}])
        const roomProData =  await Product.aggregate([{$match:{isBlocked:0,room_id:new ObjectId(id)}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$sort:{date:-1}}])
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        console.log(roomProData)
        if(roomProData){
            res.render('user/roompro',{footcdata,footrdata,products:roomProData,udata,roomid:id})
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadRoom,
    loadRoomProducts
}