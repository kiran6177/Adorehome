const User = require("../models/userSchema");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const Coupon = require("../models/couponSchema");
const Wallet = require("../models/walletSchema");
const { ObjectId } = require("mongodb");
const easyinvoice = require("easyinvoice");
const fs = require("fs");
const path = require("path");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");

const loadOrdered = async (req, res) => {
  try {
    const uid = req.userid;
    const orderid = req.query.id;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    const orderdata = await Order.findById({ _id: orderid }).populate(
      "products.product_id"
    );
    if (orderdata != null) {
      res.render("user/ordered", {
        footcdata,
        footrdata,
        udata: udata,
        orderdata: orderdata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadOrders = async (req, res) => {
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
    const orderdata = await Order.find({ user_id: uid, payment_status: "Paid" })
      .populate("products.product_id")
      .sort({ date: "desc" });
    // console.log(orderdata[0].date);
    if (orderdata.length > 0) {
      res.render("user/orders", {
        footcdata,
        footrdata,
        udata: udata,
        orderdata: orderdata,
      });
    } else {
      res.render("user/orders", {
        footcdata,
        footrdata,
        err: "No Orders Added!!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadSummary = async (req, res) => {
  try {
    const uid = req.userid;
    const orderid = req.query.id;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    const udata = await User.findById({ _id: uid }).populate("cart.product_id");
    const orderdata = await Order.findById({ _id: orderid }).populate(
      "products.product_id address_id"
    );
    console.log(orderdata.address_id);
    if (orderdata != null) {
      res.render("user/ordersummary", {
        footcdata,
        footrdata,
        udata: udata,
        orderdata: orderdata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { oid, pid } = req.query;
    console.log(oid, pid);
    const cancelData = await Order.findOneAndUpdate(
      { _id: oid, "products.product_id": pid },
      { $set: { "products.$.status": "Cancelled" } },
      { new: true }
    );
    console.log(cancelData);
    if (cancelData != null) {
      let qtytoupdate = 0;
      let tot = 0;
      cancelData.products.forEach((el) => {
        if (el.product_id == pid && el.status == "Cancelled") {
          qtytoupdate = el.qty;
          tot = el.price
        }
      });

      let totamount = cancelData.total_amount - tot * qtytoupdate;
      console.log(totamount);
      if (cancelData.coupon_id != "Nil") {
        const coupondet = await Coupon.aggregate([
          { $match: { _id: new ObjectId(cancelData.coupon_id) } },
        ]);
        if (coupondet.length > 0) {
          if (coupondet[0].couponlimit > totamount && totamount != 0) {
            totamount = totamount + coupondet[0].reductionrate;
          }
        }
      }
      console.log(totamount);
      if (
        cancelData.payment_method === "RazorPay" ||
        cancelData.payment_method === "Wallet"
      ) {
        let amounttorefund = cancelData.total_amount - totamount;
        let walletHistoryData = {
          order_id: oid,
          refundamount: amounttorefund,
          payment_method: cancelData.payment_method,
          user_id: cancelData.user_id,
          date: Date.now(),
        };
        const walletHistory = await Wallet.create(walletHistoryData);
        const walletaddition = await User.findByIdAndUpdate(
          { _id: cancelData.user_id },
          { $inc: { walletamount: amounttorefund } },
          { new: true }
        );
        console.log(walletaddition);
        console.log(walletHistory);
      }
      const UpdateTotal = await Order.findByIdAndUpdate(
        { _id: oid },
        { $set: { total_amount: totamount } }
      );

      const stockUpdate = await Product.findByIdAndUpdate(
        { _id: pid },
        { $inc: { stock: qtytoupdate } }
      );
      if (stockUpdate != null) {
        res.json({ data: "Order Cancelled!!" });
      } else {
        res.json({ err: "Cannot Cancel Order!!" });
      }
    } else {
      res.json({ err: "Cannot Cancel Order!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const cancelOrderPayment = async (req, res) => {
  try {
    const { oid } = req.query;
    console.log(oid);
    const cancelData = await Order.findOneAndDelete({ _id: oid });
    console.log(cancelData);
    if (cancelData != null) {
      console.log(cancelData);
      let prodettoupdate = [];
      cancelData.products.forEach((el) => {
        let qtytoupdate = {
          product_id: el.product_id,
          qty: el.qty,
        };
        prodettoupdate.push(qtytoupdate);
      });
      console.log(prodettoupdate);
      let stockUpdate = [];
      prodettoupdate.forEach(async (element) => {
        updateData = await Product.findByIdAndUpdate(
          { _id: element.product_id },
          { $inc: { stock: element.qty } }
        );
        stockUpdate.push(updateData);
      });

      if (stockUpdate != null) {
        res.json({ data: "Order Cancelled due to Payment Failure!!" });
      } else {
        res.json({ err: "Cannot Cancel Order!!" });
      }
    } else {
      res.json({ err: "Cannot Cancel Order!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const returnOrder = async (req, res) => {
  try {
    const { oid, pid } = req.query;
    const returndata = await Order.findOneAndUpdate(
      { _id: oid, "products.product_id": pid },
      { $set: { "products.$.status": "Returned" } },
      { new: true }
    );
    console.log(returndata);
    if (returndata != null) {
      let qtytoupdate = 0;
      let tot = 0;
      returndata.products.forEach((el) => {
        if (el.product_id == pid && el.status == "Returned") {
          qtytoupdate = el.qty;
          tot = el.price
        }
      });
      let totamount = returndata.total_amount - tot * qtytoupdate;
      console.log(totamount);
      if (returndata.coupon_id != "Nil") {
        const coupondet = await Coupon.aggregate([
          { $match: { _id: new ObjectId(returndata.coupon_id) } },
        ]);
        if (coupondet.length > 0) {
          if (coupondet[0].couponlimit > totamount && totamount != 0) {
            totamount = totamount + coupondet[0].reductionrate;
          }
        }
      }
      console.log(totamount);

      const UpdateTotal = await Order.findByIdAndUpdate(
        { _id: oid },
        { $set: { total_amount: totamount } }
      );

      const stockUpdate = await Product.findByIdAndUpdate(
        { _id: pid },
        { $inc: { stock: qtytoupdate } }
      );
      if (stockUpdate != null) {
        res.json({ success: "Order Returned!!" });
      } else {
        res.json({ err: "Cannot Return Order!!" });
      }
    } else {
      res.json({ err: "Cannot Return Order!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const generateInvoice = async (req, res) => {
  try {
    const { id } = req.query;
    const orderdata = await Order.aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $unwind: "$products" },
      { $project: { _id: 0, products: 1, date: 1 } },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          as: "productdetails",
        },
      },
      { $unwind: "$productdetails" },
    ]);
    const currentdate = orderdata[0].date
      .toUTCString()
      .split(" ")
      .slice(1, 4)
      .join(" ");
    console.log(currentdate);
    let products = [];
    orderdata.forEach((el) => {
      products.push({
        quantity: el.products.qty,
        description: el.productdetails.productname,
        "tax-rate": 0,
        price: el.productdetails.price,
      });
    });
    console.log(products);
    const data = {
      images: {
        logo: fs.readFileSync(
          path.join(__dirname, "../public/images/LOGO Black.png"),
          "base64"
        ),
      },
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
      },
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
      },
      information: {
        number: "2022.0001",
        date: currentdate,
      },
      products: products,
      "bottom-notice": "Thank You for your purchase.",
      settings: {
        currency: "INR",
        "tax-notation": "vat",
        "margin-top": 50,
        "margin-right": 50,
        "margin-left": 50,
        "margin-bottom": 25,
      },
    };
    const result = await easyinvoice.createInvoice(data);
    //   console.log(result.pdf)
    //   await fs.writeFileSync(path.join(__dirname,'../assets/pdf',"invoice.pdf"),result.pdf,'base64')

    res.json({ pdfData: result.pdf });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadOrdered,
  loadOrders,
  loadSummary,
  cancelOrder,
  cancelOrderPayment,
  returnOrder,
  generateInvoice,
};
