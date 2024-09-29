const Brand = require("../models/brandSchema");
const fs = require("fs").promises;
const path = require("path");
const { uploadToCloudinary, destroyFromCloudinary } = require("../utils/cloudinary");
const PRODUCT_FOLDER = "adorehome/products"
const loadbrand = async (req, res) => {
  try {
    const getbrand = await Brand.find({ isListed: 0 });
    if (getbrand != null) {
      res.render("admin/brand", { data: getbrand });
    } else {
      res.render("admin/brand");
      console.log(getbrand);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const brandadd = async (req, res) => {
  try {
    const brandname = req.body.brandname;
    const status = req.body.status;

    let image = await uploadToCloudinary(req.file.buffer,req.file.mimetype,PRODUCT_FOLDER);

    const data = {
      brandname,
      status,
      image,
    };

    const roomdata = await Brand.create(data);
    if (roomdata != null) {
      res.redirect("/admin/brands");
    } else {
      console.log(roomdata);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadEditBrand = async (req, res) => {
  try {
    const { id } = req.query;
    const getBrand = await Brand.findById({ _id: id });
    res.render("admin/editbrand", { data: getBrand });
  } catch (error) {
    console.log(error.message);
  }
};

const editBrand = async (req, res) => {
  try {
    const { id, brandname, status } = req.body;
    let brandData;
    if (req.file) {
      const brands = await Brand.findById({ _id: id });
      await destroyFromCloudinary(brands.image,PRODUCT_FOLDER);
      let image = await uploadToCloudinary(req.file.buffer,req.file.mimetype,PRODUCT_FOLDER);
      brandData = {
        brandname,
        status,
        image,
      };
    } else {
      brandData = {
        brandname,
        status,
      };
    }

    const brandUpdate = await Brand.findByIdAndUpdate(
      { _id: id },
      { $set: brandData }
    );
    res.redirect("/admin/brands");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.query;
    const unlistBrand = await Brand.findByIdAndUpdate(
      { _id: id },
      { $set: { isListed: 1 } }
    );
    res.redirect("/admin/brands");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadbrand,
  brandadd,
  loadEditBrand,
  editBrand,
  deleteBrand,
};
