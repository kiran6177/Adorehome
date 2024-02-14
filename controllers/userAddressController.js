const User = require("../models/userSchema");
const Address = require("../models/addressSchema");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadAddress = async (req, res) => {
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
    const addData = await Address.find({ user_id: uid ,isListed:0});
    if (addData.length > 0) {
      res.render("user/manageaddress", {
        footcdata,
        footrdata,
        udata: udata,
        addData: addData,
      });
    } else {
      res.render("user/manageaddress", {
        footcdata,
        footrdata,
        err: "No Addresses added!!",
      });
      console.log("Cannot Fetch addresses");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadAddAddress = async (req, res) => {
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
    res.render("user/addaddress", { footcdata, footrdata, udata: udata });
  } catch (error) {
    console.log(error.message);
  }
};

const saveAddress = async (req, res) => {
  try {
    const uid = req.userid;
    const {
      name,
      mobile,
      district,
      pincode,
      country,
      state,
      streetAddress,
      landmark,
    } = req.body;
    const addressdata = {
      user_id: uid,
      name,
      mobile,
      district,
      pincode,
      state,
      country,
      streetAddress,
      landmark,
    };

    const addressAdd = await Address.create(addressdata);
    if (addressAdd != null) {
      res.redirect("/address");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadEditAddress = async (req, res) => {
  try {
    const uid = req.userid;
    const addressid = req.query.id;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    const addressData = await Address.findById({ _id: addressid });
    if (addressData) {
      res.render("user/editaddress", {
        footcdata,
        footrdata,
        udata: udata,
        addData: addressData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editAddress = async (req, res) => {
  try {
    const uid = req.userid;
    const {
      name,
      mobile,
      district,
      pincode,
      country,
      state,
      streetAddress,
      landmark,
      addId,
    } = req.body;
    const addressUpdate = {
      user_id: uid,
      name,
      mobile,
      district,
      pincode,
      state,
      country,
      streetAddress,
      landmark,
    };

    const addressUp = await Address.findByIdAndUpdate(
      { _id: addId },
      { $set: addressUpdate }
    );
    if (addressUp != null) {
      res.redirect("/address");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const removeAddress = async (req, res) => {
  try {
    const addId = req.query.id;
    const remAdd = await Address.findByIdAndUpdate({ _id: addId },{$set:{isListed:1}});
    if (remAdd != null) {
      res.redirect("/address");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadAddress,
  loadAddAddress,
  saveAddress,
  loadEditAddress,
  editAddress,
  removeAddress,
};
