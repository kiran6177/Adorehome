const Banner = require("../models/bannerSchema");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs").promises;
const { ObjectId } = require("mongodb");
const { uploadToCloudinary, destroyFromCloudinary } = require("../utils/cloudinary");
const { cropAndSave } = require("../utils/crop");
const BANNER_FOLDER = "adorehome/banner";

const loadBanner = async (req, res) => {
  try {
    const findBanner = await Banner.find();
    console.log(findBanner);
    res.render("admin/banner", { banner: findBanner });
  } catch (error) {
    console.log(error.message);
  }
};

const addBanner = async (req, res) => {
  try {
    const { bannertitle, description, status, croppeddata } = req.body;
    console.log(
      bannertitle,
      description,
      status,
      croppeddata
    );
    let croppedbanner = croppeddata ? JSON.parse(croppeddata) : null;

    let imageUrl = "";

    if (croppedbanner != null) {
      console.log("crop",croppedbanner);
      const { x , y , width , height } = croppedbanner;
      const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
      console.log("CROPEDBUFF",croppedBuffer);
      const url = await uploadToCloudinary(croppedBuffer,req.file.mimetype,BANNER_FOLDER) 
      imageUrl = url;
    }else if(req.file){
      console.log(req.file);
      const url = await uploadToCloudinary(req.file.buffer,req.file.mimetype,BANNER_FOLDER) 
      imageUrl = url;
    }

    const bannertoSave = {
      bannertitle,
      description,
      status,
      bannerimage: imageUrl,
    };
    console.log(bannertoSave);
    
    const savedBanner = await Banner.create(bannertoSave);
    console.log(savedBanner);
    if ("savedBanner") {
      res.redirect("/admin/banner");
    } else {
      res.render("admin/banner", { message: "Cannot add Banner!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadEditBanner = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const bannerdata = await Banner.aggregate([
      { $match: { _id: new ObjectId(id) } },
    ]);
    console.log(bannerdata);
    if (bannerdata) {
      res.render("admin/editbanner", { banner: bannerdata[0] });
    } else {
      res.render("admin/editbanner");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editBanner = async (req, res) => {
  try {
    const { bannerid, bannertitle, description, status, croppeddata } =
      req.body;
    console.log(bannerid, bannertitle, description, status, croppeddata);
    let bannerToedit;

    if (req.file) {
      const bannerdata = await Banner.findById({ _id: bannerid });
      if(bannerdata?.bannerimage){
        await destroyFromCloudinary(bannerdata.bannerimage,BANNER_FOLDER)
      }
      let croppedbanner = croppeddata ? JSON.parse(croppeddata) : null;

      let imageUrl = "";

      if (croppedbanner != null) {
        console.log("crop",croppedbanner);
        const { x , y , width , height } = croppedbanner;
        const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
        console.log("CROPEDBUFF",croppedBuffer);
        const url = await uploadToCloudinary(croppedBuffer,req.file.mimetype,BANNER_FOLDER) 
        imageUrl = url;
      }else{
        const url = await uploadToCloudinary(req.file.buffer,req.file.mimetype,BANNER_FOLDER) 
        imageUrl = url;
      }
      bannerToedit = {
        bannertitle,
        description,
        status,
        bannerimage:imageUrl,
      };
    } else {
      bannerToedit = {
        bannertitle,
        description,
        status,
      };
    }
    const bannerEdit = await Banner.findByIdAndUpdate(
      { _id: bannerid },
      { $set: bannerToedit },
      { new: true }
    );
    console.log(bannerEdit);
    if (bannerEdit) {
      res.redirect("/admin/banner");
    } else {
      console.log("banner error");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.query;
    const deleteData = await Banner.findByIdAndDelete({ _id: id });
    if(deleteData?.bannerimage){
      await destroyFromCloudinary(deleteData.bannerimage,BANNER_FOLDER)
    }
    if (deleteData) {
      res.redirect("/admin/banner");
    } else {
      console.log("Banner delete");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadBanner,
  addBanner,
  loadEditBanner,
  editBanner,
  deleteBanner,
};
