const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryname:{
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
    }
})

const Category = mongoose.model("category",categorySchema)

module.exports = Category