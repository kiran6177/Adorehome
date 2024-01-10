const path = require('path')
const fs = require('fs').promises
const Category = require("../models/categorySchema")

const loadcategory = async (req,res)=>{
try{    
    const catdet = await Category.find({isListed:0})
    
    if(catdet != null)
    {
    res.render("admin/category",{data:catdet})
    }
    else{
    res.render("admin/category")
        
    }
}catch(error)
{
    console.log(error.message)
}
}
const categoryadd = async (req,res)=>{
try{
    const {catname,status} = req.body
    const image = req.file.filename
    const data = {
        categoryname:catname,
        status:status,
        image:image
    }
    const catExist = await Category.find({categoryname:catname,isListed:0})
    if(catExist.length === 0)
    {
        const catdata = await Category.create(data)
        if(catdata != null)
        {   
            res.redirect("/admin/category")
        }
    }
    else{
        const catdet = await Category.find({isListed:0})
        res.render('admin/category',{data:catdet,message:"Category already exists!!"})
    }
}catch(error)
{
    console.log(error.message)
}
}


const loadeditcategory = async (req,res)=>{
    try {
        const id = req.query.id
        const cat = await Category.findById({_id:id})
        if(cat!= "")
        {
            res.render('admin/editcategory',{cat:cat})
        }
        else{
            console.log("Cannot Load Category data")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const editcategory = async (req,res)=>{
    try {
        const id = req.body.catid
        const catname = req.body.catname
        const status = req.body.status
        const oldimage = req.body.oldimage
        console.log(req.body)
        let imag
        if(req.file!= undefined)
        {
            if(oldimage!= "" || oldimage !== undefined)
            {
                await fs.unlink(path.join(__dirname,'../assets',oldimage))
            }
            imag = req.file.filename
        }
        else{
            imag = null
        }

        const catdata = {
            categoryname:catname,
            status:status,
            ...(imag!==null && {image:imag} )
        }

        const upcat = await Category.findByIdAndUpdate({_id:id},{$set:catdata})
        if(catdata!="")
        {
            res.redirect("/admin/category")
        }
        else{
            console.log("error in category edit")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const deletecategory = async (req,res)=>{
    try {
        const id = req.query.id
        const cat = await Category.findById({_id:id})
        // if(cat!= "")
        // {
        //     img = cat.image
        //     await fs.unlink(path.join(__dirname,'../assets',img))

        // }

        const unList = await Category.findByIdAndUpdate({_id:id},{$set:{isListed:1,status:"0"}})
        if(unList!= "")
        {
            res.redirect("/admin/category")
        }
        else{
            console.log("Error in category deletion")
        }

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadcategory,
    categoryadd,
    loadeditcategory,
    editcategory,
    deletecategory
}