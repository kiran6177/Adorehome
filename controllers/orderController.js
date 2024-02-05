const { promiseImpl } = require("ejs");
const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Coupon = require("../models/couponSchema");
const { ObjectId } = require("mongodb");

const loadOrder = async (req, res) => {
  try {
    const orderdata = await Order.find({ payment_status: "Paid" })
      .populate("user_id")
      .sort({ date: -1 });
    res.render("admin/adminorders", { orderdata: orderdata });
  } catch (error) {
    console.log(error.message);
  }
};

const loadOrderDetail = async (req, res) => {
  try {
    const orderid = req.query.id;
    const orderdetail = await Order.findById({ _id: orderid }).populate(
      "products.product_id user_id address_id"
    );
    let discount = 0;
    if (orderdetail.coupon_id && orderdetail.coupon_id != "Nil") {
      const coupondata = await Coupon.aggregate([
        { $match: { _id: new ObjectId(orderdetail.coupon_id) } },
      ]);
      discount = coupondata[0].reductionrate;
    }
    if (orderdetail != null) {
      res.render("admin/adminorderdetail", {
        orderdetail: orderdetail,
        discount,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id, val, proid } = req.query;
    console.log(req.query.proid);
    const orderdata = await Order.findOneAndUpdate(
      { _id: id, "products.product_id": proid },
      { $set: { "products.$.status": val } },
      { new: true }
    );
    console.log(orderdata);
    if (val === "Cancelled") {
      let qtytoupdate = 0;
      orderdata.products.forEach((el) => {
        if (el.product_id == proid && el.status == "Cancelled") {
          qtytoupdate = el.qty;
        }
      });
      let tot = 0;
      let productdet = await Product.findById({ _id: proid });
      if (productdet) {
        tot = productdet.price;
      }
      let totamount = orderdata.total_amount - tot * qtytoupdate;
      console.log(totamount);
      if (orderdata.coupon_id != "Nil") {
        const coupondet = await Coupon.aggregate([
          { $match: { _id: new ObjectId(orderdata.coupon_id) } },
        ]);
        if (coupondet.length > 0) {
          if (coupondet[0].couponlimit > totamount && totamount != 0) {
            totamount = totamount + coupondet[0].reductionrate;
          }
        }
      }
      if (orderdata.payment_method === "RazorPay") {
        let amounttorefund = orderdata.total_amount - totamount;
        const walletaddition = await User.findByIdAndUpdate(
          { _id: orderdata.user_id },
          { $inc: { walletamount: amounttorefund } },
          { new: true }
        );
        console.log(walletaddition);
      }
      console.log(qtytoupdate);
      const UpdateTotal = await Order.findByIdAndUpdate(
        { _id: id },
        { $set: { total_amount: totamount } }
      );
      const stockUpdate = await Product.findByIdAndUpdate(
        { _id: proid },
        { $inc: { stock: qtytoupdate } }
      );
      if (stockUpdate) {
        console.log("Stock Updated");
      }
    }
    if (orderdata != null) {
      res.json({ data: "Order status changed." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const initiateRefund = async (req, res) => {
  try {
    const { oid, pid } = req.query;
    const findOrder = await Order.aggregate([
      { $match: { _id: new ObjectId(oid) } },
    ]);
    const findReturnedProduct = await Order.aggregate([
      { $match: { _id: new ObjectId(oid) } },
      { $unwind: "$products" },
      { $match: { "products.product_id": new ObjectId(pid) } },
      { $project: { _id: 0, products: 1 } },
    ]);
    const ProductPrice = await Product.aggregate([
      { $match: { _id: new ObjectId(pid) } },
      { $project: { _id: 0, price: 1 } },
    ]);
    console.log(findReturnedProduct[0].products.qty);
    console.log(ProductPrice[0].price);
    console.log(findOrder);
    let refundamount = 0;
    if (
      findOrder[0].coupon_id != undefined &&
      findOrder[0].coupon_id != "Nil"
    ) {
      const coupondata = await Coupon.aggregate([
        { $match: { _id: new ObjectId(findOrder[0].coupon_id) } },
      ]);
      if (findOrder[0].total_amount < coupondata[0].couponlimit) {
        refundamount =
          findReturnedProduct[0].products.qty * ProductPrice[0].price -
          coupondata[0].reductionrate;
      } else {
        let amounttorefund =
          findReturnedProduct[0].products.qty * ProductPrice[0].price;
        console.log(amounttorefund);
        refundamount = amounttorefund;
      }
    } else {
      let amounttorefund =
        findReturnedProduct[0].products.qty * ProductPrice[0].price;
      console.log(amounttorefund);
      refundamount = amounttorefund;
    }
    console.log(refundamount);
    const refund = await User.findByIdAndUpdate(
      { _id: findOrder[0].user_id },
      { $inc: { walletamount: refundamount } },
      { new: true }
    );
    if (refund) {
      const statustorefunded = await Order.findOneAndUpdate(
        { _id: oid, products: { $elemMatch: { product_id: pid } } },
        { $set: { "products.$.status": "Refunded" } },
        { new: true }
      );
      console.log(statustorefunded);
      if (statustorefunded) {
        res.json({ refunded: "Refunded Successfully" });
      } else {
        res.json({ refunderr: "Error in refund" });
      }
    } else {
      res.json({ refunderr: "Error in refund" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadOrder,
  loadOrderDetail,
  changeStatus,
  initiateRefund,
};
