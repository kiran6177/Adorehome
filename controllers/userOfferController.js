const { ObjectId } = require("mongodb");
const Offer = require("../models/offerSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadOffer = async (req, res) => {
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
    const offerdata = await Offer.aggregate([{ $match: { status: "1" } }]);
    // console.log(offerdata)
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    res.render("user/offers", {
      footcdata,
      footrdata,
      offer: offerdata,
      udata,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadProOffer = async (req, res) => {
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
      { $match: { isBlocked: 0, offer_id: new ObjectId(id) } },
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
    console.log(pdata);
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    res.render("user/offerpro", {
      footcdata,
      footrdata,
      products: pdata,
      offerid: id,
      udata,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadOffer,
  loadProOffer,
};
