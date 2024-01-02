const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref:'product'
        },
        qty: { type: Number },
      },
    ],
    default:[]
  },
  type: {
    type: String,
    required: true,
    default:"user"
  },
  coupon_id: {
    type:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Coupon'
    }],
    default:[]
},
  wishlist:{
   type:[
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
      },
      qty: {
        type: Number,
      },
    },
  ],
  default:[]
},
  isActive: {
    type: Number,
    required: true,
    default:0
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
