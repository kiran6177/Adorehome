const Offer = require('../models/offerSchema')
const path = require('path')
const Jimp = require('jimp')
const { ObjectId } = require('bson')
const fs = require('fs').promises

const loadOffer = async (req,res)=>{
    try {
        const offerdata = await Offer.aggregate([{$match:{status:"1"}}])
        res.render('admin/adminoffers',{offer:offerdata})
    } catch (error) {
        console.log(error.message)
    }
}

const addOffer = async (req,res)=>{
    try {
        const {offertitle,status,description,percentage,croppeddata} = req.body

        let croppedoffer = croppeddata ? JSON.parse(croppeddata) : null

        async function cropAndSave(inputPath, outputFilePath, x, y, width, height) {
            try {
              const image = await Jimp.read(inputPath);
              image.crop(x, y, width, height);
              await image.writeAsync(outputFilePath);
              console.log('Image saved successfully!');
            } catch (error) {
              console.error('Error:', error);
            }
          }

        if(croppedoffer!=null){
            const inputImagePath = path.join(__dirname,'../assets',req.file.filename)
            const outputImagePath = path.join(__dirname,'../assets',req.file.filename)
            cropAndSave(inputImagePath, outputImagePath, croppedoffer.x, croppedoffer.y, croppedoffer.width, croppedoffer.height);
          }

          const offerdata = {
            offertitle,
            status,
            description,
            discount:percentage,
            offerimage:req.file.filename
          }

          const offerAdd = await Offer.create(offerdata)
          if(offerAdd){
            res.redirect('/admin/offer')
          }
    } catch (error) {
        console.log(error.message)
    }
}

const loadEditOffer = async (req,res)=>{
    try {
        const {id} = req.query
        const offerdata = await Offer.aggregate([{$match:{_id:new ObjectId(id)}}])
        res.render('admin/editoffer',{offer:offerdata[0]})
    } catch (error) {
        console.log(error.message)
    }
}

const editOffer = async (req,res)=>{
    try {
        const {offertitle,status,description,percentage,croppeddata,id} = req.body
        console.log(offertitle,status,description,percentage,croppeddata)
        let offerdata
        if(req.file){
            let croppedoffer = croppeddata ? JSON.parse(croppeddata) : null

        async function cropAndSave(inputPath, outputFilePath, x, y, width, height) {
            try {
              const image = await Jimp.read(inputPath);
              image.crop(x, y, width, height);
              await image.writeAsync(outputFilePath);
              console.log('Image saved successfully!');
            } catch (error) {
              console.error('Error:', error);
            }
          }

        if(croppedoffer!=null){
            const inputImagePath = path.join(__dirname,'../assets',req.file.filename)
            const outputImagePath = path.join(__dirname,'../assets',req.file.filename)
            cropAndSave(inputImagePath, outputImagePath, croppedoffer.x, croppedoffer.y, croppedoffer.width, croppedoffer.height);
          }
           offerdata = {
            offertitle,
            status,
            description,
            discount:percentage,
            offerimage:req.file.filename
          }
        const getImgName = await Offer.findById({_id:id})

        const deleted = await fs.unlink(path.join(__dirname,'../assets',getImgName.offerimage))
        console.log("del"+deleted)
        }else{
            offerdata = {
                offertitle,
                status,
                description,
                discount:percentage,
              }
        }
        
        const editOffer = await Offer.findByIdAndUpdate({_id:id},{$set:offerdata},{new:true})
        if(editOffer){
            res.redirect('/admin/offer')
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

const deleteOffer = async (req,res)=>{
    try {
        const {id} = req.query
        const deleteOffer = await Offer.findByIdAndDelete({_id:id})
        console.log(deleteOffer)
        if(deleteOffer){
            const deleted = await fs.unlink(path.join(__dirname,'../assets',deleteOffer.offerimage))           
            res.redirect('/admin/offer')
        }
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    loadOffer,
    addOffer,
    loadEditOffer,
    editOffer,
    deleteOffer
}