const Brand = require("../models/brandSchema");
const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const { ObjectId } = require("mongodb");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadBrands = async (req, res) => {
  try {
    const uid = req.userid;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    const branddata = await Brand.find();
    console.log(branddata);
    res.render("user/brands", {
      footcdata,
      footrdata,
      udata: udata,
      branddata: branddata,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadProBrands = async (req, res) => {
  try {
    const { id } = req.query;
    const uid = req.userid;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    let pdata = await Product.aggregate([
      { $match: { isBlocked: 0, brand_id: new ObjectId(id) } },
      {
        $lookup: {
          from: "offers",
          localField: "offer_id",
          foreignField: "_id",
          as: "offerdata",
        },
      },
      { $sort: { date: -1 } },
    ]);
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    res.render("user/brandpro", {
      footcdata,
      footrdata,
      products: pdata,
      udata,
      brandid: id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadBrands,
  loadProBrands,
};
