const Product = require('../models/productSchema')
const Brand = require('../models/brandSchema')
const Category = require('../models/categorySchema')
const Room = require('../models/roomSchema')
const Offer = require('../models/offerSchema')
const Jimp = require('jimp')
const fs = require('fs').promises
const path = require('path')


const loadproducts = async (req,res)=>{
   try{
    const prodata = await Product.find({isBlocked:0})
    res.render("admin/productmanage",{products:prodata})
}catch(error)
{
    console.log(error.message)
}
}
const loadaddproducts = async (req,res)=>{
    try{
    const bdata = await Brand.find({status:"1"})
    const cdata = await Category.find({status:"1"})
    const rdata = await Room.find({status:"1"})
    const odata = await Offer.aggregate([{$match:{status:"1"}}])
    res.render("admin/addproduct",{brand:bdata,category:cdata,room:rdata,offer:odata})
}catch(error)
{
    console.log(error.message)
}
}
const addproducts = async (req,res)=>{
   try{ 
    const {productname,description,color,brandname,procategory,roomcategory,price,stock,offer,cropvaluesmain,cropvaluesimg1,cropvaluesimg2,cropvaluesimg3,cropvaluesimg4} = req.body
    console.log(cropvaluesmain,cropvaluesimg1,cropvaluesimg2,cropvaluesimg3,cropvaluesimg4)
    const croppedmain = cropvaluesmain ? JSON.parse(cropvaluesmain) : null
    const cropped1 = cropvaluesimg1 ? JSON.parse(cropvaluesimg1) : null
    const cropped2 = cropvaluesimg2 ? JSON.parse(cropvaluesimg2) : null
    const cropped3 = cropvaluesimg3 ? JSON.parse(cropvaluesimg3) : null
    const cropped4 = cropvaluesimg4 ? JSON.parse(cropvaluesimg4) : null

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

      if(croppedmain!=null){
        const inputImagePath = path.join(__dirname,'../assets',req.files['mainimage'][0].filename)
        const outputImagePath = path.join(__dirname,'../assets',req.files['mainimage'][0].filename)
        cropAndSave(inputImagePath, outputImagePath, croppedmain.x, croppedmain.y, croppedmain.width, croppedmain.height);
      }
      if(cropped1!=null){
        const inputImagePath = path.join(__dirname,'../assets',req.files['imgs'][0].filename)
        const outputImagePath = path.join(__dirname,'../assets',req.files['imgs'][0].filename)
        cropAndSave(inputImagePath, outputImagePath, cropped1.x, cropped1.y, cropped1.width, cropped1.height);
      }
      if(cropped2!=null){
        const inputImagePath = path.join(__dirname,'../assets',req.files['imgs'][1].filename)
        const outputImagePath = path.join(__dirname,'../assets',req.files['imgs'][1].filename)
        cropAndSave(inputImagePath, outputImagePath, cropped2.x, cropped2.y, cropped2.width, cropped2.height);
      }
      if(cropped3!=null){
        const inputImagePath = path.join(__dirname,'../assets',req.files['imgs'][2].filename)
        const outputImagePath = path.join(__dirname,'../assets',req.files['imgs'][2].filename)
        cropAndSave(inputImagePath, outputImagePath, cropped3.x, cropped3.y, cropped3.width, cropped3.height);
      }
      if(cropped4!=null){
        const inputImagePath = path.join(__dirname,'../assets',req.files['imgs'][3].filename)
        const outputImagePath = path.join(__dirname,'../assets',req.files['imgs'][3].filename)
        cropAndSave(inputImagePath, outputImagePath, cropped4.x, cropped4.y, cropped4.width, cropped4.height);
      }


    const main = req.files['mainimage'][0].filename
    let img = []
    req.files['imgs'].forEach(element => {
        img.push(element.filename)
    })
    console.log(main)
    console.log(img)
     const prodata = {
            productname,
            description,
            color,
            brand_id:brandname,
            category_id:procategory,
            room_id:roomcategory,
            price,
            mainimage:main,
            image:img,
            stock,
            offer_id:offer != "NA" ? offer : null
        }

    
    

    console.log(prodata)

    const prosaved = await Product.create(prodata)
    if(prosaved != null){
    res.redirect("/admin/products")

    }
    else{
        console.log(prosaved)
    }
}
catch(error)
{
    console.log(error.message)
}
}

const loadeditproducts = async (req,res)=>{
    try {
        const pid = req.query.id
        const bdata = await Brand.find({status:"1"})
        const cdata = await Category.find({status:"1"})
        const rdata = await Room.find({status:"1"})
        const odata = await Offer.aggregate([{$match:{status:"1"}}])
        const pdata = await Product.findById({_id:pid}).populate('brand_id category_id room_id')
         console.log(pdata)
        if(pdata)
        {
        res.render('admin/editproduct',{prodata:pdata,bdata:bdata,cdata:cdata,rdata:rdata,offer:odata})
        }
        else{
            console.log("No Product data")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const editproducts = async (req,res)=>{
    try {
    const {proid,productname,description,color,brandname,procategory,roomcategory,price,stock,offer,oldmain,oldimg1,oldimg2,oldimg3,oldimg4} = req.body
        console.log("old"+oldimg1)
        console.log("old"+oldimg2)

    let main
    let img1
    let img2
    let img3
    let img4
    const file = req.files
    // console.log(req.files)
    if(req.files.mainimage)
    {   if(oldmain!== "")
    {
        await fs.unlink(path.join(__dirname,'../assets',oldmain))
    }
    console.log("entrerd")     
    main = req.files.mainimage[0].filename
    console.log("entrerd1")     

    }
    else{
        main = null
    }
    if(req.files)
    {
        console.log(req.files)
        if(req.files.img1)
    {   if(oldimg1!== ''){
        await fs.unlink(path.join(__dirname,'../assets',oldimg1))
        }
        img1 =  req.files.img1[0].filename
    }
    if(req.files.img2){
        if(oldimg2!== '')
        {
            await fs.unlink(path.join(__dirname,'../assets',oldimg2))
        }
        img2 = req.files.img2[0].filename
    }
    if(req.files.img3){
        if(oldimg3!== '')
        {
            await fs.unlink(path.join(__dirname,'../assets',oldimg3))
        }
        img3 = req.files.img3[0].filename
    }
    if(req.files.img4){
        if(oldimg4!== '')
        {
            await fs.unlink(path.join(__dirname,'../assets',oldimg4))
        }
        img4 = req.files.img4[0].filename
    }
    }
    console.log("hdhhd")
    const prodata = {
        productname,
        description,
        color:color,
        brand_id:brandname,
        category_id:procategory,
        room_id:roomcategory,
        price,
        ...(main!==null && {mainimage:main}),
        ...(img1!== undefined  && {"image.0":img1}),
        ...(img2!== undefined  && {"image.1":img2}),
        ...(img3!== undefined  && {"image.2":img3}),
        ...(img4!== undefined  && {"image.3":img4}),
        stock,
        offer_id:offer!="NA" ? offer : null
    }
     console.log(prodata)
     const edit = await Product.findByIdAndUpdate({_id:proid},{$set:prodata})
     if(edit != null){
        res.redirect("/admin/products")
     }
     else{
        console.log("error in edit")
     }
    } catch (error) {
        console.log(error.message)
    }
}

const deleteproduct = async (req,res)=>{
    try {
        const id = req.query.id
        const del = await Product.findByIdAndUpdate({_id:id},{$set:{isBlocked:1}})
        if(del!=="")
        {
            res.redirect("/admin/products")
        }
        else{
            console.log("deletion error")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const removeImage = async (req,res)=>{
    try {
        const {id,img,mainimg,pos} = req.query
        console.log(id,img,mainimg)
        if(mainimg === undefined)
        {   
            let remData
            console.log(pos)
            if(pos == 0)
            {
                 remData = await Product.findOneAndUpdate({_id:id},{$set:{'image.0':""}})
            }
            else if(pos==1)
            {
                 remData = await Product.findOneAndUpdate({_id:id},{$set:{'image.1':""}})
            }
            else if(pos==2)
            {
                 remData = await Product.findOneAndUpdate({_id:id},{$set:{'image.2':""}})
            }
            else{
                 remData = await Product.findOneAndUpdate({_id:id},{$set:{'image.3':""}})
            }
        if(remData!= null)
        {
            res.json({data:"Image removed Succesfully!!"})
        }
        else{
            res.json({err:"Error in Removing!!"})
        }
        }
        else{
            console.log("mainimage")
        const remData = await Product.findOneAndUpdate({_id:id},{$set:{'mainimage':""}})
        if(remData!= null)
        {
            res.json({data:"Image removed Succesfully!!"})
        }
        else{
            res.json({err:"Error in Removing!!"})
        }
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadproducts,
    loadaddproducts,
    addproducts,
    loadeditproducts,
    editproducts,
    deleteproduct,
    removeImage
}
