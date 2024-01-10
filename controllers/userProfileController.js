const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const Order = require('../models/orderSchema')
const mongoose = require('mongoose')

const profileLoad = async (req,res)=>{
    try {
        const uid = req.userid
        const orderDetails = await Order.aggregate([{$match:{user_id:new mongoose.Types.ObjectId(uid)}},{$count:'orderCount'}])
        console.log(orderDetails)
        const orderCount = orderDetails[0].orderCount
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        if(udata.length !=0)
        {
            // console.log(udata)
        res.render('user/userprofile',{udata:udata,orderCount:orderCount})
        }
        else{
            console.log("error in profilerender")
        }
    } catch (error) {
        console.log(error.message);
    }
}

const editProfileLoad = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        res.render('user/usereditprofile',{udata:udata})
    } catch (error) {
        console.log(error.message)
    }
}

const editProfile = async (req,res)=>{
    try {
        const uid = req.userid
        const {firstname,lastname,email,countrycode,mobile} = req.body
        
        const user = {
            firstname,
            lastname,
            email,
            mobile:countrycode+mobile,
        }

        const editUser = await User.findByIdAndUpdate({_id:uid},{$set:user})
        if(editUser!=null)
        {
        res.redirect('/profile')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const changePasswordLoad = async(req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        res.render('user/changepassword',{udata:udata})
    } catch (error) {
        console.log(error.message);
    }
}

const changePassword = async (req,res)=>{
    try {
        const uid = req.userid
        const {oldpassword,newpassword,confirmpassword} = req.body
        const udata = await User.findOne({_id:uid})
        if(udata!=null)
        {   
            const isMatching = await bcrypt.compare(oldpassword,udata.password)
            if(isMatching)
            {   

                if(newpassword === confirmpassword)
                {
                    const hashedpass = await bcrypt.hash(confirmpassword,10)
                    const passUpdate = await User.findByIdAndUpdate({_id:uid},{$set:{password:hashedpass}})
                    if(passUpdate!=null)
                    {
                        res.redirect('/profile')
                    }
                }
                else{
                    res.render('user/changepassword',{err:"New Password should be matched."})
                }
                
            }
            else{
                res.render('user/changepassword',{err:"Password does not match."})
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    profileLoad,
    editProfileLoad,
    editProfile,
    changePasswordLoad,
    changePassword
}