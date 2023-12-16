const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    expireAt:{
        type:Date,
        required:true
    }
})

const otp = mongoose.model("Otp",otpSchema)


module.exports = otp