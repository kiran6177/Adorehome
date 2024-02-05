const Coupon = require("../models/couponSchema");

const loadCoupon = async (req, res) => {
  try {
    const coupondata = await Coupon.find({ isListed: 0 });
    res.render("admin/admincoupon", { coupondata });
  } catch (error) {
    console.log(error.message);
  }
};

const addCoupon = async (req, res) => {
  try {
    const { couponname, description, status, limit, reduction, couponcode } =
      req.body;
    const coupondata = {
      couponname,
      description,
      status,
      couponlimit: limit,
      couponcode: couponcode.toUpperCase(),
      reductionrate: reduction,
    };
    const couponexistdata = await Coupon.find({ isListed: 0 });
    let matched = 0;
    if (couponexistdata) {
      couponexistdata.forEach((el) => {
        if (el.couponname == couponname || el.couponcode == couponcode) {
          matched++;
        }
      });
    }
    if (matched === 0) {
      const addtocoupons = await Coupon.create(coupondata);
      if (addtocoupons) {
        res.redirect("/admin/coupon");
      } else {
        res.render("admin/admincoupon", {
          message: "can't Add",
          coupondata: couponexistdata,
        });
      }
    } else {
      res.render("admin/admincoupon", {
        message: "Coupon Already Exists",
        coupondata: couponexistdata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const loadEditCoupon = async (req, res) => {
  try {
    const { id } = req.query;
    const coupondata = await Coupon.findById({ _id: id });
    res.render("admin/editcoupon", { coupondata });
  } catch (error) {
    console.log(error.message);
  }
};

const editCoupon = async (req, res) => {
  try {
    const {
      couponname,
      description,
      status,
      limit,
      reduction,
      couponcode,
      coupid,
    } = req.body;
    console.log(
      couponname,
      description,
      status,
      limit,
      reduction,
      couponcode,
      coupid
    );
    const datatoedit = {
      couponname,
      description,
      status,
      couponlimit: limit,
      reductionrate: reduction,
      couponcode: couponcode.toUpperCase(),
    };
    const coupondata = await Coupon.find({ isListed: 0 });
    let matched = 0;
    if (coupondata) {
      coupondata.forEach((el) => {
        if (el.couponname == couponname || el.couponcode == couponcode) {
          matched++;
        }
      });
    }
    const olddata = await Coupon.findById({ _id: coupid });
    if (matched < 2) {
      const edited = await Coupon.findByIdAndUpdate(
        { _id: coupid },
        { $set: datatoedit }
      );
      if (edited) {
        res.redirect("/admin/coupon");
      } else {
        res.render("admin/editcoupon", {
          message: "Invalid Data!!",
          coupondata: olddata,
        });
      }
    } else {
      res.render("admin/editcoupon", {
        message: "Invalid Data!!",
        coupondata: olddata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadCoupon,
  addCoupon,
  loadEditCoupon,
  editCoupon,
};
