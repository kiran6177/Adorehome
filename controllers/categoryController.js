const User = require("../models/userSchema");
const Category = require("../models/categorySchema")

const loadcategory = async (req,res)=>{
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
}
const categoryadd = async (req,res)=>{
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
}


module.exports = {
    loadcategory,
    categoryadd
}