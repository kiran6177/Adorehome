const Product = require("../models/productSchema");
const Brand = require("../models/brandSchema");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");
const Offer = require("../models/offerSchema");
const Jimp = require("jimp");
const fs = require("fs").promises;
const path = require("path");
const { uploadToCloudinary, destroyFromCloudinary } = require("../utils/cloudinary");
const { cropAndSave } = require("../utils/crop");
const PRODUCT_FOLDER = "adorehome/product";

const loadproducts = async (req, res) => {
  try {
    const prodata = await Product.find({ isBlocked: 0 });
    res.render("admin/productmanage", { products: prodata });
  } catch (error) {
    console.log(error.message);
  }
};
const loadaddproducts = async (req, res) => {
  try {
    const bdata = await Brand.find({ status: "1" });
    const cdata = await Category.find({ status: "1" });
    const rdata = await Room.find({ status: "1" });
    const odata = await Offer.aggregate([{ $match: { status: "1" } }]);
    res.render("admin/addproduct", {
      brand: bdata,
      category: cdata,
      room: rdata,
      offer: odata,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const addproducts = async (req, res) => {
  try {
    const {
      productname,
      description,
      color,
      brandname,
      procategory,
      roomcategory,
      price,
      stock,
      offer,
      cropvaluesmain,
      cropvaluesimg1,
      cropvaluesimg2,
      cropvaluesimg3,
      cropvaluesimg4,
    } = req.body;
    // console.log(cropvaluesmain,cropvaluesimg1,cropvaluesimg2,cropvaluesimg3,cropvaluesimg4)
    let protrim = productname.trim();
    const isExist = await Product.find({ productname: protrim });
    console.log(isExist);
    if (isExist.length === 0) {
      const croppedmain = cropvaluesmain ? JSON.parse(cropvaluesmain) : null;
      const cropped1 = cropvaluesimg1 ? JSON.parse(cropvaluesimg1) : null;
      const cropped2 = cropvaluesimg2 ? JSON.parse(cropvaluesimg2) : null;
      const cropped3 = cropvaluesimg3 ? JSON.parse(cropvaluesimg3) : null;
      const cropped4 = cropvaluesimg4 ? JSON.parse(cropvaluesimg4) : null;

      let mainUrl = "";
      let imagesUrl = [];

      

      if (croppedmain != null) {
        const { x , y , width , height } = croppedmain;
        const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
        console.log("CROPEDBUFF",croppedBuffer);
        mainUrl = await uploadToCloudinary(croppedBuffer,req.files["mainimage"][0].mimetype,PRODUCT_FOLDER); 
      }else{
        mainUrl = await uploadToCloudinary(req.files["mainimage"][0].buffer,req.files["mainimage"][0].mimetype,PRODUCT_FOLDER); 
      }
      if (cropped1 != null) {
        const { x , y , width , height } = cropped1;
        const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
        console.log("CROPEDBUFF",croppedBuffer);
        imagesUrl[0] = await uploadToCloudinary(croppedBuffer,req.files["imgs"][0].mimetype,PRODUCT_FOLDER);
      }else{
        imagesUrl[0] = await uploadToCloudinary(req.files["imgs"][0].buffer,req.files["imgs"][0].mimetype,PRODUCT_FOLDER);
      }
      if (cropped2 != null) {
        const { x , y , width , height } = cropped2;
        const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
        console.log("CROPEDBUFF",croppedBuffer);
        imagesUrl[1] = await uploadToCloudinary(croppedBuffer,req.files["imgs"][1].mimetype,PRODUCT_FOLDER);
      }else{
        imagesUrl[1] = await uploadToCloudinary(req.files["imgs"][1].buffer,req.files["imgs"][1].mimetype,PRODUCT_FOLDER);
      }
      if (cropped3 != null) {
        const { x , y , width , height } = cropped3;
        const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
        console.log("CROPEDBUFF",croppedBuffer);
        imagesUrl[2] = await uploadToCloudinary(croppedBuffer,req.files["imgs"][2].mimetype,PRODUCT_FOLDER);
      }else{
        imagesUrl[2] = await uploadToCloudinary(req.files["imgs"][2].buffer,req.files["imgs"][2].mimetype,PRODUCT_FOLDER);
      }
      if (cropped4 != null) {
        const { x , y , width , height } = cropped4;
        const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
        console.log("CROPEDBUFF",croppedBuffer);
        imagesUrl[3] = await uploadToCloudinary(croppedBuffer,req.files["imgs"][3].mimetype,PRODUCT_FOLDER);
      }else{
        imagesUrl[3] = await uploadToCloudinary(req.files["imgs"][3].buffer,req.files["imgs"][3].mimetype,PRODUCT_FOLDER);
      }

      const main = mainUrl;
      let img = imagesUrl;
      console.log(main);
      console.log(img);
      const prodata = {
        productname,
        description,
        color,
        brand_id: brandname,
        category_id: procategory,
        room_id: roomcategory,
        price,
        mainimage: main,
        image: img,
        stock,
        offer_id: offer != "NA" ? offer : null,
      };

      console.log(prodata);

      const prosaved = await Product.create(prodata);
      if (prosaved != null) {
        res.redirect("/admin/products");
      } else {
        console.log(prosaved);
      }
    } else {
      const bdata = await Brand.find({ status: "1" });
      const cdata = await Category.find({ status: "1" });
      const rdata = await Room.find({ status: "1" });
      const odata = await Offer.aggregate([{ $match: { status: "1" } }]);
      res.render("admin/addproduct", {
        err: "Product Already Exists.",
        brand: bdata,
        category: cdata,
        room: rdata,
        offer: odata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadeditproducts = async (req, res) => {
  try {
    const pid = req.query.id;
    const bdata = await Brand.find({ status: "1" });
    const cdata = await Category.find({ status: "1" });
    const rdata = await Room.find({ status: "1" });
    const odata = await Offer.aggregate([{ $match: { status: "1" } }]);
    const pdata = await Product.findById({ _id: pid }).populate(
      "brand_id category_id room_id"
    );
    console.log(pdata);
    if (pdata) {
      res.render("admin/editproduct", {
        prodata: pdata,
        bdata: bdata,
        cdata: cdata,
        rdata: rdata,
        offer: odata,
      });
    } else {
      console.log("No Product data");
    }
  } catch (error) {
    res.redirect("/admin/products");
    console.log(error.message);
  }
};

const editproducts = async (req, res) => {
  try {
    const {
      proid,
      productname,
      description,
      color,
      brandname,
      procategory,
      roomcategory,
      price,
      stock,
      offer,
      oldmain,
      oldimg1,
      oldimg2,
      oldimg3,
      oldimg4,
    } = req.body;
    console.log("old" + oldimg1);
    console.log("old" + oldimg2);
    let count = 0;
    const productname1 = productname.trim();
    const anotherData = await Product.find({ productname: productname1 });
    anotherData.forEach((el) => {
      if (el._id != proid) {
        count++;
      }
    });
    if (count === 0) {
      let main;
      let img1;
      let img2;
      let img3;
      let img4;
      const file = req.files;
      // console.log(req.files)
      if (req.files.mainimage) {
        if (oldmain !== "") {
          await destroyFromCloudinary(oldmain,PRODUCT_FOLDER)
        }
        console.log("entrerd");
        main = await uploadToCloudinary(req.files.mainimage[0].buffer,req.files.mainimage[0].mimetype,PRODUCT_FOLDER);
        console.log("entrerd1");
      } else {
        main = null;
      }
      if (req.files) {
        console.log(req.files);
        if (req.files.img1) {
          if (oldimg1 !== "") {
            await destroyFromCloudinary(oldimg1,PRODUCT_FOLDER)
          }
          img1 = await uploadToCloudinary(req.files.img1[0].buffer,req.files.img1[0].mimetype,PRODUCT_FOLDER);
        }
        if (req.files.img2) {
          if (oldimg2 !== "") {
            await destroyFromCloudinary(oldimg2,PRODUCT_FOLDER)
          }
          img2 = await uploadToCloudinary(req.files.img2[0].buffer,req.files.img2[0].mimetype,PRODUCT_FOLDER);
        }
        if (req.files.img3) {
          if (oldimg3 !== "") {
            await destroyFromCloudinary(oldimg3,PRODUCT_FOLDER)
          }
          img3 = await uploadToCloudinary(req.files.img3[0].buffer,req.files.img3[0].mimetype,PRODUCT_FOLDER);
        }
        if (req.files.img4) {
          if (oldimg4 !== "") {
            await destroyFromCloudinary(oldimg4,PRODUCT_FOLDER)
          }
          img4 = await uploadToCloudinary(req.files.img4[0].buffer,req.files.img4[0].mimetype,PRODUCT_FOLDER);
        }
      }
      console.log("hdhhd");
      const prodata = {
        productname,
        description,
        color: color,
        brand_id: brandname,
        category_id: procategory,
        room_id: roomcategory,
        price,
        ...(main !== null && { mainimage: main }),
        ...(img1 !== undefined && { "image.0": img1 }),
        ...(img2 !== undefined && { "image.1": img2 }),
        ...(img3 !== undefined && { "image.2": img3 }),
        ...(img4 !== undefined && { "image.3": img4 }),
        stock,
        offer_id: offer != "NA" ? offer : null,
      };
      console.log(prodata);
      const edit = await Product.findByIdAndUpdate(
        { _id: proid },
        { $set: prodata }
      );
      if (edit != null) {
        res.redirect("/admin/products");
      } else {
        console.log("error in edit");
      }
    } else {
      const bdata = await Brand.find({ status: "1" });
      const cdata = await Category.find({ status: "1" });
      const rdata = await Room.find({ status: "1" });
      const odata = await Offer.aggregate([{ $match: { status: "1" } }]);
      const pdata = await Product.findById({ _id: proid }).populate(
        "brand_id category_id room_id"
      );
      res.render("admin/editproduct", {
        err: "Product Already Exists.",
        prodata: pdata,
        bdata: bdata,
        cdata: cdata,
        rdata: rdata,
        offer: odata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteproduct = async (req, res) => {
  try {
    const id = req.query.id;
    const del = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: 1 } }
    );
    if (del !== "") {
      res.redirect("/admin/products");
    } else {
      console.log("deletion error");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const removeImage = async (req, res) => {
  try {
    const { id, img, mainimg, pos } = req.query;
    console.log(id, img, mainimg);
    if (mainimg === undefined) {
      let remData;
      console.log(pos);
      if (pos == 0) {
        remData = await Product.findOneAndUpdate(
          { _id: id },
          { $set: { "image.0": "" } }
        );
      } else if (pos == 1) {
        remData = await Product.findOneAndUpdate(
          { _id: id },
          { $set: { "image.1": "" } }
        );
      } else if (pos == 2) {
        remData = await Product.findOneAndUpdate(
          { _id: id },
          { $set: { "image.2": "" } }
        );
      } else {
        remData = await Product.findOneAndUpdate(
          { _id: id },
          { $set: { "image.3": "" } }
        );
      }
      if (remData != null) {
        res.json({ data: "Image removed Succesfully!!" });
      } else {
        res.json({ err: "Error in Removing!!" });
      }
    } else {
      console.log("mainimage");
      const remData = await Product.findOneAndUpdate(
        { _id: id },
        { $set: { mainimage: "" } }
      );
      if (remData != null) {
        res.json({ data: "Image removed Succesfully!!" });
      } else {
        res.json({ err: "Error in Removing!!" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadproducts,
  loadaddproducts,
  addproducts,
  loadeditproducts,
  editproducts,
  deleteproduct,
  removeImage,
};
