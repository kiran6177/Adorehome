const User = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const jwttoken = require("../utils/jwt");
const Otp = require('../utils/otp')
const mailer = require('../utils/mailer')
const bcrypt = require('bcrypt');
const Product = require("../models/productSchema");
const saltRounds = 10;
const Banner = require('../models/bannerSchema')
const jwt = require('jsonwebtoken')
const forgotMailer = require('../utils/forgotmailer');
const { default: Swal } = require("sweetalert2");
const { ObjectId } = require("mongodb");

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
        console.log()
        console.log("wishlist")
        }

        let pdata  = await Product.aggregate([{$match:{isBlocked:0}},{$lookup:{from:'offers',localField:'offer_id',foreignField:'_id',as:'offerdata'}},{$limit:8}])
        
         console.log(pdata[0].offerdata)
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

const getBanner = async (req,res)=>{
    try {
        const bannerdata = await Banner.aggregate([{$match:{status:"1"}}])
        if(bannerdata){
            res.json({banner:bannerdata})
        }
        else{
            res.json({bannererr:"Cannot fetch banner."})
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

const loadEmailPage = async (req,res)=>{
    try {
        res.render('user/enteremail')
    } catch (error) {
        console.log(error.message)
    }
}

const sendEmail = async (req,res)=>{
    try {
        const {email} = req.body

        const isRegisteredUser = await User.findOne({email:email})
        if(isRegisteredUser){
            const payload = {id:isRegisteredUser._id}
            const secret = process.env.JWT_secret + isRegisteredUser.password
            const token = jwt.sign(payload,secret,{expiresIn:'10m'})
            const link = `http://localhost:3003/resetpassword?id=${isRegisteredUser._id}&token=${token}`
            console.log(link)
            const mailSend = forgotMailer.sendForgotmail(isRegisteredUser.email,link)
            if(mailSend){
                console.log("mail")
                    res.render('user/enteremail',{success:"A link is send to your e-mail."})
            }
        }else{
            res.render('user/enteremail',{error:"Invalid E-mail."})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const resetPassword = async (req,res)=>{
    try {
        console.log("hello")
        const {id,token} = req.query
        const matchUser = await User.aggregate([{$match:{_id:new ObjectId(id),type:"user"}}])
        console.log(matchUser)
        if(matchUser.length > 0){
            if(token){
                    const secret = process.env.JWT_secret + matchUser[0].password
                    const isVerified = jwt.verify(token,secret)
                    console.log(isVerified)
                    if(isVerified){
                        res.render('user/forgotpassword',{id:matchUser[0]._id})
                    }else{
                        console.log("hi")
                        res.status(404)
                    }
            }else{
                res.status(404)
            }
        }else{
            res.status(404)
        }
    } catch (error) {
        res.redirect('/error')
        console.log(error.message)
    }
}

const reset = async (req,res)=>{
    try {
        const {newpassword,confirmpassword,uid} = req.body
        if(newpassword === confirmpassword){
            const hashed = await bcrypt.hash(confirmpassword,saltRounds)
            if(hashed){
                const changePassword = await User.findByIdAndUpdate({_id:uid},{$set:{password:hashed}})
                if(changePassword){
                    res.redirect('/')
                }
            }
            else{
            res.render("user/forgotpassword")
            }
        }else{
            res.render("user/forgotpassword")
        }
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
  logout,
  getBanner,
  loadEmailPage,
  sendEmail,
  resetPassword,
  reset
};
