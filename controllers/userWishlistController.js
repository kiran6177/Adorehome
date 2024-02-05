const User = require('../models/userSchema')
const Category = require('../models/categorySchema')
const Room = require('../models/roomSchema')

const addToWishlist = async (req,res)=>{
    try {
        const uid = req.userid
        const {productid} = req.query
        console.log(productid)
        const addtowish = await User.findByIdAndUpdate({_id:uid},{$push:{wishlist:{product_id:productid}}},{new:true})
        console.log(addtowish)
        if(addtowish){
        res.json({success:"added"})

        }
        else{
            res.json({adderr:"Cannot Add"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const removeFromWishlist = async (req,res)=>{
    try {
        const uid = req.userid
        const {productid} = req.query
        console.log(productid)
        const remfromwish = await User.findByIdAndUpdate({_id:uid},{$pull:{wishlist:{product_id:productid}}},{new:true})
        console.log(remfromwish)
        if(remfromwish){
        res.json({success:"removed"})

        }
        else{
            res.json({adderr:"Cannot remove"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadWishlist = async (req,res)=>{
    try {
        const uid = req.userid
        let footcdata = await Category.aggregate([{$match:{status:"1",isListed:0}},{$limit:4}])
        let footrdata = await Room.aggregate([{$match:{status:"1"}},{$limit:4}])
        const udata = await User.findById({_id:uid}).populate('cart.product_id wishlist.product_id')
        res.render('user/wishlist',{footcdata,footrdata,udata:udata})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    loadWishlist
}