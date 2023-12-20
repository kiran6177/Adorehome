const User = require("../models/userSchema");
const path = require('path')
const fs = require('fs').promises
const Category = require("../models/categorySchema")

const loadcategory = async (req,res)=>{
try{    
    const getcat = await Category.find()
    console.log(getcat)
    if(getcat != null)
    {
    res.render("admin/category",{data:getcat})
    }
    else{
    res.render("admin/category")
        console.log(getcat)
    }
}catch(error)
{
    console.log(error.message)
}
}
const categoryadd = async (req,res)=>{
try{
    const catname = req.body.catname
    const status = req.body.status
    const image = req.file.filename
    const data = {
        categoryname:catname,
        status:status,
        image:image
    }

    const catdata = await Category.create(data)
    if(catdata != null)
    {   
        res.redirect("/admin/category")
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
        if(cat!= "")
        {
            img = cat.image
            await fs.unlink(path.join(__dirname,'../assets',img))

        }

        const delcat = await Category.findByIdAndDelete({_id:id})
        if(delcat!= "")
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