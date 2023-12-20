const Brand = require('../models/brandSchema')

const loadbrand = async (req,res)=>{

    try{
    const getbrand = await Brand.find()
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

module.exports = {
    loadbrand,
    brandadd
}