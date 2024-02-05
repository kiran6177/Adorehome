const Wallet = require("../models/walletSchema");
const User = require("../models/userSchema");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadWallet = async (req, res) => {
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
    const wallet = await Wallet.find({ user_id: uid });
    res.render("user/wallet", { footcdata, footrdata, udata, wallet });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadWallet,
};
