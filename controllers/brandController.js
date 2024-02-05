const Brand = require('../models/brandSchema')
const fs = require('fs').promises
const path = require('path')

const loadbrand = async (req,res)=>{

    try{
    const getbrand = await Brand.find({isListed:0})
    if(getbrand != null)
    {
    res.render("admin/brand",{data:getbrand})
    }
    else{
        res.render("admin/brand")
        console.log(getbrand)
    }
}catch(error)
{
    console.log(error.message)
}
}

const brandadd = async (req,res)=>{
try{    
    const brandname = req.body.brandname
    const status = req.body.status
    const image = req.file.filename
    const data = {
        brandname,
        status,
        image
    }

    const roomdata = await Brand.create(data)
    if(roomdata != null)
    {   
        res.redirect("/admin/brands")
    }
    else{
        console.log(roomdata)
    }
}catch(error){
    console.log(error.message)
}
}

const loadEditBrand = async (req,res)=>{
    try {
        const {id} = req.query
        const getBrand = await Brand.findById({_id:id})
        res.render("admin/editbrand",{data:getBrand})
        
    } catch (error) {
        console.log(error.message)
    }
}

const editBrand = async (req,res)=>{
    try {
        const {id,brandname,status} = req.body
        let brandData
        if(req.file){
            const brands = await Brand.findById({_id:id})
            await fs.unlink(path.join(__dirname,'../assets',brands.image))  
            brandData = {
                brandname,
                status,
                image:req.file.filename
            }
        }else{
            brandData = {
                brandname,
                status,
            }
        }

        const brandUpdate = await Brand.findByIdAndUpdate({_id:id},{$set:brandData})
        res.redirect('/admin/brands')
    } catch (error) {
        console.log(error.message)
    }
}

const deleteBrand = async (req,res)=>{
    try {
        const {id} = req.query
        const unlistBrand = await Brand.findByIdAndUpdate({_id:id},{$set:{isListed:1}})
        res.redirect('/admin/brands')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadbrand,
    brandadd,
    loadEditBrand,
    editBrand,
    deleteBrand
}