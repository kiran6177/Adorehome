const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address',
        required:true
    },
    status:{
        type:String,
        default:"Processing"
    },
    products:[{
        product_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        qty:{
            type:Number,
            required:true
        }
    }],
    payment_method:{
        type:String,
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    }
})

const Order = mongoose.model('order',orderSchema)

module.exports = Order