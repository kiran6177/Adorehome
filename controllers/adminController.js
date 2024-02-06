const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Order = require("../models/orderSchema");

const filter = require("../utils/cronFilter");

const jwttoken = require("../utils/jwt");
const bcrypt = require("bcrypt");

const loginredirect = async (req, res) => {
  res.redirect("/admin/login");
};

const loginload = async (req, res) => {
  res.render("admin/login");
};

const login = async (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;

  const admin = await User.findOne({ email: email, type: "admin" });
  if (admin != null) {
    const isAdmin = await bcrypt.compare(pwd, admin.password);
    if (isAdmin) {
      const payload = {
        id: admin._id.toString(),
      };
      const token = jwttoken.createtoken(payload);
      res.cookie("admintoken", token, { secure: true, httpOnly: true });
      res.redirect("/admin/home");
    } else {
      res.render("admin/login", { err: "Invalid Password !!" });
    }
  } else {
    res.render("admin/login", { err: "Invalid Credentials !!" });
  }
};

const loadhome = async (req, res) => {
  try {
    const propagesize = 8;

    propage = 1;

    const monthLimit = filter.currentMonth();

    const userCount = await User.aggregate([
      {
        $match: {
          date: { $gte: monthLimit.start, $lt: monthLimit.end },
          type: { $ne: "admin" },
        },
      },
      { $count: "users" },
    ]);
    const ucount = userCount.length > 0 ?userCount[0].users.toString() : 0;
    const orderCount = await Order.aggregate([
      {
        $match: {
          date: { $gte: monthLimit.start, $lt: monthLimit.end },
          payment_status: "Paid",
        },
      },
      { $count: "orders" },
    ]);
    const ocount = orderCount.length > 0 ? orderCount[0].orders.toString() : 0;
    const productCount = await Order.aggregate([
      {
        $match: {
          date: { $gte: monthLimit.start, $lt: monthLimit.end },
          payment_status: "Paid",
        },
      },
      { $unwind: "$products" },
      { $group: { _id: null, qty: { $sum: "$products.qty" } } },
      { $project: { _id: 0, qty: 1 } },
    ]);
    const pcount = productCount.length > 0 ? productCount[0].qty.toString() : 0;
    const prodet = await Product.aggregate([
      { $match: { isBlocked: 0 } },
      { $sort: { date: -1 } },
      { $limit: 8 },
    ]);
    const prodetCount = await Product.aggregate([
      { $match: { isBlocked: 0 } },
      { $sort: { date: -1 } },
      { $count: "stock" },
    ]);
    const proSold = await Order.aggregate([
      { $match: { payment_status: "Paid" } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          as: "prodetails",
        },
      },
      { $sort: { date: -1 } },
      { $skip: (propage - 1) * propagesize },
      { $limit: propagesize },
    ]);
    const totalProCount = await Order.aggregate([
      { $match: { payment_status: "Paid" } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          as: "prodetails",
        },
      },
      { $count: "proCount" },
    ]);
    let currentPage = propage;
    //  console.log(totalProCount[0].proCount)
    res.render("admin/dashboard", {
      userCount: ucount,
      orderCount: ocount,
      productCount: pcount,
      products: prodet,
      prosold: proSold,
      totalProducts: totalProCount.length > 0 ? totalProCount[0].proCount : 0,
      currentPage: currentPage,
      totalStock: prodetCount.length > 0 ? prodetCount[0].stock : 0,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const search = async (req, res) => {
  try {
    const key = req.body.searchdata;
    const prodata = await Product.find({
      productname: { $regex: new RegExp(key, "i") },
    });
    console.log(prodata);
    if (prodata) {
      res.render("admin/productmanage", { products: prodata });
    } else {
      res.render("/admin/products", { err: "No Products Found !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loginredirect,
  loginload,
  login,
  loadhome,
  search,
};
