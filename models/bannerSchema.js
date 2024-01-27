const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    bannertitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    bannerimage:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"1",
    }   
})

const Banner = mongoose.model('banner',bannerSchema)

module.exports = Banner