const Offer = require("../models/offerSchema");
const path = require("path");
const Jimp = require("jimp");
const { ObjectId } = require("bson");
const { cropAndSave } = require("../utils/crop");
const { uploadToCloudinary, destroyFromCloudinary } = require("../utils/cloudinary");
const fs = require("fs").promises;
const OFFER_FOLDER = "adorehome/offers";

const loadOffer = async (req, res) => {
  try {
    const offerdata = await Offer.aggregate([{ $match: { status: "1" } }]);
    res.render("admin/adminoffers", { offer: offerdata });
  } catch (error) {
    console.log(error.message);
  }
};

const addOffer = async (req, res) => {
  try {
    const { offertitle, status, description, percentage, croppeddata } =
      req.body;

    let croppedoffer = croppeddata ? JSON.parse(croppeddata) : null;

    let imageUrl = "";

    if (croppedoffer != null) {
      console.log("crop",croppedoffer);
      const { x , y , width , height } = croppedoffer;
      const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
      console.log("CROPEDBUFF",croppedBuffer);
      const url = await uploadToCloudinary(croppedBuffer,req.file.mimetype,OFFER_FOLDER) 
      imageUrl = url;
    }else if(req.file){
      console.log(req.file);
      const url = await uploadToCloudinary(req.file.buffer,req.file.mimetype,OFFER_FOLDER) 
      imageUrl = url;
    }

    const offerdata = {
      offertitle,
      status,
      description,
      discount: percentage,
      offerimage:imageUrl,
    };

    const offerAdd = await Offer.create(offerdata);
    if (offerAdd) {
      res.redirect("/admin/offer");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadEditOffer = async (req, res) => {
  try {
    const { id } = req.query;
    const offerdata = await Offer.aggregate([
      { $match: { _id: new ObjectId(id) } },
    ]);
    res.render("admin/editoffer", { offer: offerdata[0] });
  } catch (error) {
    console.log(error.message);
  }
};

const editOffer = async (req, res) => {
  try {
    const { offertitle, status, description, percentage, croppeddata, id } =
      req.body;
    console.log(offertitle, status, description, percentage, croppeddata);
    let offerdata;
    if (req.file) {
      let croppedoffer = croppeddata ? JSON.parse(croppeddata) : null;

      let imageUrl = "";

    if (croppedoffer != null) {
      console.log("crop",croppedoffer);
      const { x , y , width , height } = croppedoffer;
      const croppedBuffer = await cropAndSave(x , y , width , height,req.file.buffer);
      console.log("CROPEDBUFF",croppedBuffer);
      const url = await uploadToCloudinary(croppedBuffer,req.file.mimetype,OFFER_FOLDER) 
      imageUrl = url;
    }else if(req.file){
      console.log(req.file);
      const url = await uploadToCloudinary(req.file.buffer,req.file.mimetype,OFFER_FOLDER) 
      imageUrl = url;
    }
      offerdata = {
        offertitle,
        status,
        description,
        discount: percentage,
        offerimage: imageUrl,
      };
      const getImgName = await Offer.findById({ _id: id });

      await destroyFromCloudinary(getImgName.offerimage,OFFER_FOLDER);

    } else {
      offerdata = {
        offertitle,
        status,
        description,
        discount: percentage,
      };
    }

    const editOffer = await Offer.findByIdAndUpdate(
      { _id: id },
      { $set: offerdata },
      { new: true }
    );
    if (editOffer) {
      res.redirect("/admin/offer");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOffer = async (req, res) => {
  try {
    const { id } = req.query;
    const deleteOffer = await Offer.findByIdAndDelete({ _id: id });
    console.log(deleteOffer);
    if (deleteOffer) {
      await destroyFromCloudinary(deleteOffer.offerimage,OFFER_FOLDER);

      res.redirect("/admin/offer");
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  loadOffer,
  addOffer,
  loadEditOffer,
  editOffer,
  deleteOffer,
};
