const Coupon = require("../models/couponSchema");
const User = require("../models/userSchema");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadCoupon = async (req, res) => {
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
    const coupondata = await Coupon.find({ isListed: 0, status: "1" });
    res.render("user/coupon", { footcdata, footrdata, udata, coupondata });
  } catch (error) {
    console.log(error.message);
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { code } = req.query;
    const uid = req.userid;
    console.log(code);
    const getCoupon = await Coupon.findOne({ couponcode: code });
    if (getCoupon) {
      const isApplicable = await User.findOne({
        _id: uid,
        coupon_id: { $elemMatch: { $eq: getCoupon._id } },
      });
      if (isApplicable === null) {
        res.json({ isApplied: getCoupon });
      } else {
        res.json({ couperr: "Invalid Coupon" });
      }
    } else {
      res.json({ couperr: "Invalid Coupon" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadCoupon,
  applyCoupon,
};
