const Product = require('../models/productSchema')
const Brand = require('../models/brandSchema')
const Category = require('../models/categorySchema')
const Room = require('../models/roomSchema')
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
    res.render("admin/addproduct",{brand:bdata,category:cdata,room:rdata})
}catch(error)
{
    console.log(error.message)
}
}
const addproducts = async (req,res)=>{
   try{ 
    const {productname,description,color,brandname,procategory,roomcategory,price,stock,offer} = req.body

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
        offer_id:offer
    }

    // console.log(prodata)

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
        const pdata = await Product.findById({_id:pid}).populate('brand_id category_id room_id')
         console.log(pdata)
        if(pdata)
        {
        res.render('admin/editproduct',{prodata:pdata,bdata:bdata,cdata:cdata,rdata:rdata})
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
        offer_id:offer
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
        // const findpro = await Product.findById({_id:id})
        // if(findpro!= "")
        // {
        //     let main = findpro.mainimage
        //     if(main!=="")
        //     {
        //         await fs.unlink(path.join(__dirname,'../assets',main))
        //     }
        //     let img = findpro.image
        //     if(img.length > 0 )
        //     {   let one = img[0]
        //         let two = img[1]
        //         let three = img[2]
        //         let four = img[3]
        //         await fs.unlink(path.join(__dirname,'../assets',one))
        //         await fs.unlink(path.join(__dirname,'../assets',two))
        //         await fs.unlink(path.join(__dirname,'../assets',three))
        //         await fs.unlink(path.join(__dirname,'../assets',four))

        //     }
        // }
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
