const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    products:[{
        product_id:{
            type:mongoose.Schema.Types.ObjectId,
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