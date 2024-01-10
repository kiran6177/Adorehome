const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");
const User = require('../models/userSchema')

const loadProducts = async (req, res) => {
  try {
    const uid = req.userid
    const existcatdata = await Category.find({status:"1"})
    console.log(existcatdata)
    let pdata = []
    let products
    for(let i = 0 ;i < existcatdata.length ; i++)
    {
       products = await Product.find({category_id:existcatdata[i]._id})
      pdata.push(products)
    }
    console.log("products"+products)
    console.log(pdata)
    const udata = await User.findById({_id:uid}).populate('cart.product_id')
    res.render("user/productslist", { products: pdata ,udata:udata});
  } catch (error) {
    console.log(error.message);
  }
};

const loadProductDetail = async (req, res) => {
  try {
    const uid = req.userid
    const proid = req.query.id;
    let qty
    if(req.query.qty)
    {
      qty = req.query.qty
    }
    const productdetail = await Product.findById({ _id: proid });
    const udata = await User.findById({_id:uid}).populate('cart.product_id')
    const cat = productdetail.category_id;
    const pdata = await Product.find({
      _id: { $ne: proid },
      category_id: cat,
    }).limit(4);
    if (productdetail != null) {
      res.render("user/productdetail", { product: productdetail, rel: pdata ,udata:udata ,qty:qty});
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadProducts,
  loadProductDetail,
};
