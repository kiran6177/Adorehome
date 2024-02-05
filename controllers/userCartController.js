const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadCart = async (req, res) => {
  const uid = req.userid;
  let footcdata = await Category.aggregate([
    { $match: { status: "1", isListed: 0 } },
    { $limit: 4 },
  ]);
  let footrdata = await Room.aggregate([
    { $match: { status: "1" } },
    { $limit: 4 },
  ]);
  const udata = await User.findById({ _id: uid }).populate({
    path: "cart.product_id",
    populate: { path: "offer_id", model: "offer" },
  });
  // console.log(udata.cart[2].product_id)
  res.render("user/cart", { footcdata, footrdata, udata: udata });
};

const addToCart = async (req, res) => {
  try {
    const uid = req.userid;
    const { proid, qty } = req.query;
    const isExist = await User.find({ _id: uid, "cart.product_id": proid });
    // console.log(isExist)
    if (isExist.length === 0) {
      const pdata = await Product.findById({ _id: proid });
      if (qty <= pdata.stock) {
        const updatedCart = await User.findByIdAndUpdate(
          { _id: uid },
          { $addToSet: { cart: { product_id: proid, qty: qty } } },
          { new: true }
        );
        if (updatedCart) {
          res.json({ data: "Added to Cart Succesfully." });
        } else {
          res.json({ err: "Failed in Adding." });
        }
      } else {
        res.json({ stockerr: `Only ${pdata.stock} Items left !!` });
      }
    } else {
      res.json({ err: "Item already exist in Cart." });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const qtyAdd = async (req, res) => {
  try {
    const id = req.userid;
    const { qty, proid } = req.query;
    const pdata = await Product.findById({ _id: proid });
    if (qty <= pdata.stock) {
      const updatedCart = await User.findOneAndUpdate(
        { _id: id, cart: { $elemMatch: { product_id: proid } } },
        { $set: { "cart.$.qty": qty } },
        { new: true }
      );
      console.log(updatedCart);
      if (updatedCart) {
        res.json({ data: "Success" });
      } else {
        res.json({ err: "Failed" });
      }
    } else {
      res.json({ stockerr: `Only ${pdata.stock} Items left!!` });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const qtySub = async (req, res) => {
  try {
    const id = req.userid;
    const { qty, proid } = req.query;
    const pdata = await Product.findById({ _id: proid });
    if (qty <= pdata.stock) {
      const updatedCart = await User.findOneAndUpdate(
        { _id: id, cart: { $elemMatch: { product_id: proid } } },
        { $set: { "cart.$.qty": qty } },
        { new: true }
      );
      console.log(updatedCart);
      if (updatedCart) {
        res.json({ data: "Success" });
      } else {
        res.json({ err: "Failed" });
      }
    } else {
      res.json({ stockerr: `Only ${pdata.stock} Items left!!` });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const delCart = async (req, res) => {
  try {
    const id = req.userid;
    const { proid } = req.query;
    //  console.log(id,proid)
    const delspec = await User.findByIdAndUpdate(
      { _id: id },
      { $pull: { cart: { product_id: proid } } }
    );
    // console.log(delspec)
    if (delspec) {
      res.json({ data: "Item removed from Cart!!" });
    } else {
      res.json({ err: "Failed" });
    }
  } catch (error) {
    console.log(err.message);
  }
};

module.exports = {
  loadCart,
  addToCart,
  qtyAdd,
  qtySub,
  delCart,
};
