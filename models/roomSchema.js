const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomname:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isListed:{
        type:Number,
        default:0
    }
})

const Room = mongoose.model("room",roomSchema)

module.exports = Room