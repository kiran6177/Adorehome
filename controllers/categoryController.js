const path = require("path");
const fs = require("fs").promises;
const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");
const { uploadToCloudinary, destroyFromCloudinary } = require("../utils/cloudinary");
const CATEGORY_FOLDER = "adorehome/category";

const loadcategory = async (req, res) => {
  try {
    const catdet = await Category.find({ isListed: 0 });

    if (catdet != null) {
      res.render("admin/category", { data: catdet });
    } else {
      res.render("admin/category");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const categoryadd = async (req, res) => {
  try {
    const { catname, status } = req.body;

    const catExist = await Category.find({
      categoryname: catname,
      isListed: 0,
    });
    if (catExist.length === 0) {
      let image = await uploadToCloudinary(req.file.buffer,req.file.mimetype,CATEGORY_FOLDER);

      const data = {
        categoryname: catname,
        status: status,
        image: image,
      };
      const catdata = await Category.create(data);
      if (catdata != null) {
        res.redirect("/admin/category");
      }
    } else {
      const catdet = await Category.find({ isListed: 0 });
      res.render("admin/category", {
        data: catdet,
        message: "Category already exists!!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadeditcategory = async (req, res) => {
  try {
    const id = req.query.id;
    const cat = await Category.findById({ _id: id });
    if (cat != "") {
      res.render("admin/editcategory", { cat: cat });
    } else {
      console.log("Cannot Load Category data");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editcategory = async (req, res) => {
  try {
    const id = req.body.catid;
    const catname = req.body.catname;
    const status = req.body.status;
    const oldimage = req.body.oldimage;
    console.log(req.body);
    let imag;
    if (req.file != undefined) {
      if (oldimage != "" || oldimage !== undefined) {
        await destroyFromCloudinary(oldimage,CATEGORY_FOLDER);
      }
      imag =  await uploadToCloudinary(req.file.buffer,req.file.mimetype,CATEGORY_FOLDER);

    } else {
      imag = null;
    }

    const catdata = {
      categoryname: catname,
      status: status,
      ...(imag !== null && { image: imag }),
    };
    const cat = await Category.findById({ _id: id });
    const catname1 = catname.trim();
    const catnameMatch = await Category.find({ categoryname: catname1 });
    let count = 0;
    catnameMatch.forEach((el) => {
      if (el._id != id) {
        count++;
      }
    });
    if (count == 0) {
      const upcat = await Category.findByIdAndUpdate(
        { _id: id },
        { $set: catdata }
      );
      if (catdata != "") {
        res.redirect("/admin/category");
      } else {
        console.log("error in category edit");
      }
    } else {
      res.render("admin/editcategory", {
        cat: cat,
        err: "Category Already Exists.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deletecategory = async (req, res) => {
  try {
    const id = req.query.id;

    const unList = await Category.findByIdAndUpdate(
      { _id: id },
      { $set: { isListed: 1, status: "0" } }
    );
    const prounlist = await Product.findOneAndUpdate(
      { category_id: id },
      { $set: { isBlocked: 1 } }
    );
    if (unList != "") {
      res.redirect("/admin/category");
    } else {
      console.log("Error in category deletion");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadcategory,
  categoryadd,
  loadeditcategory,
  editcategory,
  deletecategory,
};
