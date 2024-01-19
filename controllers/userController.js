const User = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const jwttoken = require("../utils/jwt");
const Otp = require('../utils/otp')
const mailer = require('../utils/mailer')
const bcrypt = require('bcrypt');
const Product = require("../models/productSchema");
const saltRounds = 10;
const Category = require('../models/categorySchema')


// const loginRedirect =async (req, res) => {
//     const existcatdata = await Category.find({status:"1"})
//     console.log(existcatdata)
//     let pdata = []
//     let products
//     for(let i = 0 ;i < existcatdata.length ; i++)
//     {
//        products = await Product.find({category_id:existcatdata[i]._id})
//       pdata.push(products)
//     }
//     // console.log(data)
//     res.render('user/home',{products:pdata})
// };

const loginLoad =async (req, res) => {
  res.render("user/userlogin");
};
const login =async (req, res) => {
    const {email,password} = req.body
    const loggeduser = await User.findOne({email:email,type:"user",isActive:1})
    
    if(loggeduser != null)
    {   
        const passtrue = await bcrypt.compare(password,loggeduser.password)
        if(passtrue)
        {
            res.redirect(`/otplogin?uid=${loggeduser._id}`)
        }
        else{
            res.render("user/userlogin",{err:"Invalid Password"})
        }
    }
    else{
        res.render('user/userlogin',{err:"Invalid User"})
    }
};

const signupLoad = (req, res) => {
  res.render("user/usersignup");
};

let calledpost

const otpLoad = async (req,res)=>{
    const {uid} = req.query
    // console.log("otppload "+uid)
    calledpost = false
    try {
    res.render("user/otpsignup",{uid:uid})
    setTimeout(()=>{ 
        if(!calledpost)
        {   console.log("entered into called post")
            setTimeout(()=>{
            deleteUser(uid)
        },120000)
    }
    else{
        console.log("user not deleted")
    }
},300000)

    } catch (error) {
        console.log(error.message)
    }

}



const otpLogin = async (req,res)=>{
    const {uid} = req.query
    console.log("otppload "+uid)
    try {
    res.render("user/otplogin",{uid:uid})

    } catch (error) {
        console.log(error.message)
    }

}

async function deleteUser(uid){
    try {
        const deleted  = await User.findOneAndDelete({_id:uid})
        if(deleted != null)
        {
        console.log("user deleted")

        }
        else{
            console.log("error in deletion")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const signup = async (req,res) =>{
   try{ 
    const {firstname,lastname,email,countrycode,mobile,password,confirmpassword} = req.body
    if(password === confirmpassword)
    {   
        const hashedpass =await bcrypt.hash(password,saltRounds)
        const user = {
            firstname,
            lastname,
            email,
            mobile:countrycode+mobile,
            password:hashedpass,
        }

        const userexist = await User.find({email:email,type:'user',isActive:1})
        // console.log(userexist)
        if(userexist.length === 0)
        {
            const userdata =await User.create(user)
        if(userdata != null)
        {   
            const userID = userdata._id
            console.log(userID)
            res.redirect(`/otpload?uid=${userID}`)
        }
        else{
            res.redirect('/signup')
        }
        }
        else{
            res.render("user/usersignup",{err:"Account already exist !!"})

        }
        
    }
    else{
        res.render("user/usersignup",{err:"Password does not Match !!"})
    }}
    catch(err)
    {
        console.log(err.message)
    }

}

const sendOtp =  async (req,res) =>{
try{    const {uid} = req.query
    console.log(uid+"from fetch")
    const udata = await User.findById({_id:uid})
    if(udata != null)
    {   
        const email = udata.email
        const userID = udata._id
        const OTP =  Otp.createOTP()
        console.log(OTP)
        const hashedOTP = await Otp.hashOTP(OTP)
        console.log(hashedOTP)
        const otptosave = {
            user_id:userID,
            otp:hashedOTP,
            createdAt: Date.now(),
            expireAt: Date.now() + 60000

        }
        const savedOTP =await otpModel.create(otptosave)
        //  calledpost = true
        if (savedOTP != null)
        {   console.log(savedOTP._id +"OTP saved")
            const mailres = mailer.sendmail(email,OTP)
            if(mailres)
            {
            res.json({data:"OTP send successfully!!"})
            setTimeout(()=>{Otp.removeOTP(savedOTP._id)},60000)
            }
            else{
                res.json({err:"Error in sending mail!! Try Again."})
            }
        }
        else
        {
            console.log(savedOTP)
        }
    }
    else{
        res.json({err:"User doesn't exist !!.Please register again."})
    }
}
catch(error)
{
    console.log(error.message)
}
}

const verifyOtpLogin = async (req,res)=>{
    try {
        const {otp,uid} = req.body
        const hashed = await otpModel.findOne({user_id:uid})
        if(hashed != null)
        {   console.log("hashed"+hashed)
         
            const isverified = await Otp.verifyOTP(otp,hashed.otp)
            console.log(isverified)

            if(isverified)
            {   console.log(isverified)
                const userconfirm = await User.findById({_id:uid})
                if(userconfirm != null)
                {   
                    calledpost = true
                    const id = userconfirm._id.toString()
                    const payload ={
                        _id:id,
                    }
                const token = jwttoken.createtoken(payload)
                    res.cookie("token",token,{ secure:true , httpOnly:true })
                    res.redirect("/")
                }
            else{
                    console.log("user is not confirmed")
                 }
            }
            else{
                res.render("user/otplogin",{err:"Invalid OTP !!",uid:uid})
            }

        }
        else{
            res.render('user/otplogin',{err:"OTP timed out!! Register again.",uid:uid})
        }

    } catch (error) {
        console.log(error.message)
    }
}


const verifyOtp = async (req,res)=>{
    try {
        const {otp,uid} = req.body
        
        const hashed = await otpModel.findOne({user_id:uid})
        if(hashed != null)
        {
            const isverified =await Otp.verifyOTP(otp,hashed.otp)
            if(isverified)
            {
                const userconfirm = await User.findByIdAndUpdate({_id:uid},{$set:{isActive:1}})
                if(userconfirm != null)
                {   
                    calledpost = true
                    const id = userconfirm._id.toString()
                    const payload ={
                        _id:id,
                    }
                const token = jwttoken.createtoken(payload)
                    res.cookie("token",token,{ secure:true , httpOnly:true })
                    res.redirect("/")
                }
                else{
                    console.log("user is not confirmed")
                }
            }
            else{
                res.render("user/otpsignup",{err:"Invalid OTP !!",uid:uid})
            }

        }
        else{
            res.render('user/otpsignup',{err:"OTP timed out!! Register again.",uid:uid})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async(req,res)=>{
    try {
        let data
        if(req.userid)
        {
        const uid = req.userid
         console.log("home "+uid)
         data = await User.findById({_id:uid}).populate({path:'cart.product_id'})
        console.log(data.cart)
        }
        
        const existcatdata = await Category.find({status:"1"})
        // console.log(existcatdata)
        let pdata = []
        let products
        for(let i = 0 ;i < 4 ; i++)
        {
           products = await Product.find({category_id:existcatdata[i]._id})
          pdata.push(products)
        }
        console.log(pdata.length)
        if(req.userid)
        {
        res.render('user/home',{products:pdata,udata:data})
        }
        else{
            res.render('user/home',{products:pdata})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async (req,res)=>{
    try {
        res.clearCookie('token').json({data:"Logout Successful."})
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {

  loginLoad,
  login,
  signupLoad,
  sendOtp,
  signup,
  otpLoad,
  verifyOtp,
  verifyOtpLogin,
  loadHome,
  otpLogin,
  logout
};
