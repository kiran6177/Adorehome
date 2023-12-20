const Product = require('../models/productSchema')
const Brand = require('../models/brandSchema')
const Category = require('../models/categorySchema')
const Room = require('../models/roomSchema')
const fs = require('fs').promises
const path = require('path')


const loadproducts = async (req,res)=>{
   try{
    const prodata = await Product.find()
    res.render("admin/productmanage",{products:prodata})
}catch(error)
{
    console.log(error.message)
}
}
const loadaddproducts = async (req,res)=>{
    try{
    const bdata = await Brand.find()
    const cdata = await Category.find()
    const rdata = await Room.find()
    res.render("admin/addproduct",{brand:bdata,category:cdata,room:rdata})
}catch(error)
{
    console.log(error.message)
}
}
const addproducts = async (req,res)=>{
   try{ 
    const proname = req.body.productname
    const desc = req.body.description
    const color = req.body.color
    const brandid = req.body.brandname
    const catid = req.body.procategory
    const roomid = req.body.roomcategory
    const price = req.body.price
    const stock = req.body.stock
    const offerid = req.body.offer
    const main = req.files['mainimage'][0].filename
    const img1 = req.files['img1'][0].filename
    const img2 = req.files['img2'][0].filename
    const img3 = req.files['img3'][0].filename
    const img4 = req.files['img4'][0].filename

    const img = [img1,img2,img3,img4]

    const prodata = {
        productname:proname,
        description:desc,
        color:color,
        brand_id:brandid,
        category_id:catid,
        room_id:roomid,
        price:price,
        mainimage:main,
        image:img,
        stock:stock,
        offer_id:offerid
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
        const pdata = await Product.findById({_id:pid}).populate('brand_id category_id room_id')
        // console.log(pdata)
        if(pdata)
        {
        res.render('admin/editproduct',{prodata:pdata})
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
    const proid = req.body.proid    
    const proname = req.body.productname
    const desc = req.body.description
    const color = req.body.color
    const brandid = req.body.brandname
    const catid = req.body.procategory
    const roomid = req.body.roomcategory
    const price = req.body.price
    const stock = req.body.stock
    const offerid = req.body.offer
    const oldmain  = req.body.oldmain
    const oldimg1 = req.body.oldimg1
    const oldimg2 = req.body.oldimg2 
    const oldimg3 = req.body.oldimg3 
    const oldimg4 = req.body.oldimg4 
    console.log("hi"+oldimg2)
    let main
    let img1
    let img2
    let img3
    let img4
    const file = req.files
    if(req.files.mainimage)
    {   if(oldmain!== "")
    {
        await fs.unlink(path.join(__dirname,'../assets',oldmain))
    }
         main = req.files.mainimage[0].filename
    }
    else{
        main = null
    }
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

    const prodata = {
        productname:proname,
        description:desc,
        color:color,
        brand_id:brandid,
        category_id:catid,
        room_id:roomid,
        price:price,
        ...(main!==null && {mainimage:main}),
        ...(img1!== undefined  && {"image.0":img1}),
        ...(img2!== undefined  && {"image.1":img2}),
        ...(img3!== undefined  && {"image.2":img3}),
        ...(img4!== undefined  && {"image.3":img4}),
        stock:stock,
        offer_id:offerid
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
        const findpro = await Product.findById({_id:id})
        if(findpro!= "")
        {
            let main = findpro.mainimage
            if(main!=="")
            {
                await fs.unlink(path.join(__dirname,'../assets',main))
            }
            let img = findpro.image
            if(img.length > 0 )
            {   let one = img[0]
                let two = img[1]
                let three = img[2]
                let four = img[3]
                await fs.unlink(path.join(__dirname,'../assets',one))
                await fs.unlink(path.join(__dirname,'../assets',two))
                await fs.unlink(path.join(__dirname,'../assets',three))
                await fs.unlink(path.join(__dirname,'../assets',four))

            }
        }
        const del = await Product.findByIdAndDelete({_id:id})
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

module.exports = {
    loadproducts,
    loadaddproducts,
    addproducts,
    loadeditproducts,
    editproducts,
    deleteproduct
}
