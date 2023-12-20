const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    brand_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brand'
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    room_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'room'
    },
    price:{
        type:Number,
        required:true
    },
    mainimage:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    offer_id:{
        type:String,
        default:"NA"
    }
})

const Product = mongoose.model('product',productSchema)

module.exports = Product