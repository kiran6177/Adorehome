const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");
const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const { ObjectId } = require("bson");

const loadCategory = async (req, res) => {
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
  const catData = await Category.find({ status: "1", isListed: 0 });
  res.render("user/category", {
    footcdata,
    footrdata,
    catdata: catData,
    udata: udata,
  });
};

const loadCatProducts = async (req, res) => {
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
    const catProData = await Product.aggregate([
      { $match: { isBlocked: 0, category_id: new ObjectId(id) } },
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
    console.log(catProData);
    if (catProData) {
      res.render("user/categorypro", {
        footcdata,
        footrdata,
        products: catProData,
        udata,
        catid: id,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadCategory,
  loadCatProducts,
};
