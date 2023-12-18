const Brand = require('../models/brandSchema')

const loadbrand = async (req,res)=>{

    const getbrand = await Brand.find()
    if(getbrand != null)
    {
    res.render("admin/brand",{data:getbrand})
    }
    else{
        res.render("admin/brand")
        console.log(getbrand)
    }
}

const brandadd = async (req,res)=>{
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
}

module.exports = {
    loadbrand,
    brandadd
}