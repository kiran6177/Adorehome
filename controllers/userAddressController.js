const User = require('../models/userSchema')
const Address = require('../models/addressSchema')

const loadAddress = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate("cart.product_id")
        const addData = await Address.find({user_id:uid})
        if(addData.length > 0)
        {
        res.render('user/manageaddress',{udata:udata,addData:addData})           
        }
        else{

        res.render('user/manageaddress',{err:"No Addresses added!!"})           
            console.log("Cannot Fetch addresses");
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadAddAddress = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate("cart.product_id")
        res.render('user/addaddress',{udata:udata})
    } catch (error) {
        console.log(error.message)
    }
}

const saveAddress = async (req,res)=>{
    try {
        const uid = req.userid
        const {name,mobile,district,pincode,country,state,streetAddress,landmark} = req.body
        const addressdata = {
            user_id:uid,
            name,
            mobile,
            district,
            pincode,
            state,
            country,
            streetAddress,
            landmark
        }

        const addressAdd = await Address.create(addressdata) 
        if(addressAdd != null)
        {   
            res.redirect('/address')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadEditAddress = async (req,res)=>{
    try {
        const uid = req.userid
        const addressid = req.query.id        
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const addressData = await Address.findById({_id:addressid})
        if(addressData)
        {
        res.render('user/editaddress',{udata:udata,addData:addressData})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const editAddress = async (req,res)=>{
    try {
        const uid = req.userid
        const {name,mobile,district,pincode,country,state,streetAddress,landmark,addId} = req.body
        const addressUpdate = {
            user_id:uid,
            name,
            mobile,
            district,
            pincode,
            state,
            country,
            streetAddress,
            landmark
        }

         const addressUp = await Address.findByIdAndUpdate({_id:addId},{$set:addressUpdate})
         if(addressUp!= null)
        {
            res.redirect('/address')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const removeAddress = async (req,res)=>{
    try {
        const addId = req.query.id
        const remAdd = await Address.findByIdAndDelete({_id:addId})
        if(remAdd != null)
        {
            res.redirect('/address')
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadAddress,
    loadAddAddress,
    saveAddress,
    loadEditAddress,
    editAddress,
    removeAddress
}