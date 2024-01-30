const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");
const User = require('../models/userSchema')

const loadProducts = async (req, res) => {
  try {
    const uid = req.userid
    let pdata  = await Product.aggregate([{$match:{isBlocked:0}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$sort:{date:-1}},{$limit:8}])
    let pcount  = await Product.find({isBlocked:0}).countDocuments()
    console.log(pcount)
    const udata = await User.findById({_id:uid}).populate('cart.product_id')
    res.render("user/productslist", { products: pdata ,udata:udata,pcount});
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
    const productdetail = await Product.findById({ _id: proid }).populate('offer_id');
    const udata = await User.findById({_id:uid}).populate('cart.product_id')
    const cat = productdetail.category_id;
    const pdata = await Product.find({
      _id: { $ne: proid },
      category_id: cat,
    }).populate('offer_id').limit(4);
    console.log(productdetail)
    if (productdetail != null) {
      res.render("user/productdetail", { product: productdetail, rel: pdata ,udata:udata ,qty:qty});
    }
  } catch (error) {
    res.redirect('/products')
    console.log(error.message);
  }
};

const proSearch = async (req,res)=>{
  try {
    const {search} = req.query
    const uid = req.userid
    const udata = await User.findById({_id:uid}).populate('cart.product_id')
    const pdata = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$limit:8}])
    const pdatacount = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$count:'pcount'}])

    console.log(pdatacount)
    if(pdata.length > 0)
    {
      res.json({products:pdata,procount:pdatacount[0].pcount,udata})
    }
    else{
      console.log("enter")
      res.json({perr:"NO PRODUCTS AVAILABALE!",procount:0})
    }
  } catch (error) {
    console.log(error.message)
  }
}


const productListFetch = async (req,res)=>{
  try {
    let page = req.query.page ? req.query.page : 1
    let search = req.query.search
    let filter = req.query.filter

    console.log(search)
    console.log(filter)
    let filterbyprice
    let filterbydate
    let pdata
    let pdatacount
    if(filter.split(' ')[0] === "Price"){
      if(filter.split(' ')[1] === "High-Low"){
        filterbyprice = -1
      }
      else{
        filterbyprice = 1
      }
    }
    else{
      filterbydate = -1 
    }
    console.log(filterbydate)
    console.log(filterbyprice)
    if(filterbydate != undefined){
       pdata = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$sort:{date:filterbydate}},{$skip:(page - 1)* 8},{$limit:8}])
       pdatacount = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$sort:{date:filterbydate}},{$count:'pcount'}])
    }
    else{
       pdata = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$sort:{price:filterbyprice}},{$skip:(page - 1)* 8},{$limit:8}])
       pdatacount = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$sort:{price:filterbyprice}},{$count:'pcount'}])
    }
    const uid = req.userid
    const udata = await User.findById({_id:uid}).populate('cart.product_id')

    console.log(pdata)
    if(pdata.length > 0)
    {
      res.json({products:pdata,procount:pdatacount[0].pcount,udata})
    }
    else{
      res.json({perr:"NO PRODUCTS AVAILABALE!",procount:0})
    }


  } catch (error) {
    console.log(error.message)
  }
}

const proFilter = async (req,res)=>{
  try {
    const {search,filter} = req.query
    console.log(search)
    console.log(filter)
    let filterbyprice
    let filterbydate
    let pdata
    let pdatacount
    if(filter.split(' ')[0] === "Price"){
      if(filter.split(' ')[1] === "High-Low"){
        filterbyprice = -1
      }
      else{
        filterbyprice = 1
      }
    }
    else{
      filterbydate = -1 
    }
    console.log(filterbydate)
    console.log(filterbyprice)
    if(filterbydate != undefined){
       pdata = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$sort:{date:filterbydate}},{$limit:8}])
       pdatacount = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$sort:{date:filterbydate}},{$count:'pcount'}])
    }
    else{
       pdata = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$sort:{price:filterbyprice}},{$limit:8}])
       pdatacount = await Product.aggregate([{$match:{productname:{$regex: new RegExp(search,'i')}}},{$sort:{price:filterbyprice}},{$count:'pcount'}])
    }
    const uid = req.userid
    const udata = await User.findById({_id:uid}).populate('cart.product_id')

    console.log(pdata)
    if(pdata.length > 0)
    {
      res.json({products:pdata,procount:pdatacount[0].pcount,udata})
    }
    else{
      res.json({perr:"NO PRODUCTS AVAILABALE!",procount:0})
    }

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  loadProducts,
  loadProductDetail,
  productListFetch,
  proSearch,
  proFilter
};
