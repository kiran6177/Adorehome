const User = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const jwttoken = require("../utils/jwt");
const otp = require('../utils/otp')
const mailer = require('../utils/mailer')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const loginredirect = async (req,res)=>{
    res.redirect('/admin/login')
}

const loginload = async (req,res)=>{
    res.render('admin/login')
}

const login = async (req,res)=>{
    const email = req.body.email
    const pwd = req.body.password

    const admin = await User.findOne({email:email,type:"admin"})
    if(admin != null)
    {   
        const isAdmin = await bcrypt.compare(pwd,admin.password)
        if(isAdmin)
        {   
            const payload ={
                id: admin._id.toString()
            }
            const token =  jwttoken.createtoken(payload)
            res.cookie("admintoken",token)
            res.redirect("/admin/home")
        }
        else{
            res.render("admin/login",{err:"Invalid Password !!"})
        }
    }
    else{
        res.render("admin/login",{err:"Invalid Credentials !!"})
    }
}

const loadhome = async (req,res)=>{
    
    res.render("admin/dashboard")
}

module.exports = {
    loginredirect,
    loginload,
    login,
    loadhome
}