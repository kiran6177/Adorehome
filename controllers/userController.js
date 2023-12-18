const User = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const jwttoken = require("../utils/jwt");
const otp = require('../utils/otp')
const mailer = require('../utils/mailer')
const bcrypt = require('bcrypt')
const saltRounds = 10;


const loginredirect = (req, res) => {
  res.redirect("/login");
};

const loginload =async (req, res) => {
  res.render("user/userlogin");
};
const login =async (req, res) => {
    const email = req.body.email
    const pwd = req.body.password
    const loggeduser = await User.findOne({email:email,type:"user"})
    // console.log(loggeduser)
    // console.log(loggeduser.length)
    if(loggeduser != null)
    {   console.log("hao")
        const passtrue = await bcrypt.compare(pwd,loggeduser.password)
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

const signupload = (req, res) => {
  res.render("user/usersignup");
};

let calledpost

const otpload = async (req,res)=>{
    const uid = req.query.uid
    // console.log("otppload "+uid)
    calledpost = false
    try {
    res.render("user/otpsignup",{uid:uid})
    setTimeout(()=>{ 
        if(!calledpost)
        {   console.log("entered into called post")
            setTimeout(()=>{
            deleteuser(uid)
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

const otplogin = async (req,res)=>{
    const uid = req.query.uid
    console.log("otppload "+uid)
    try {
    res.render("user/otplogin",{uid:uid})

    } catch (error) {
        console.log(error.message)
    }

}

async function deleteuser(uid){
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
   try{ const fname = req.body.firstname
    const lname = req.body.lastname
    const email = req.body.email
    const mobile = req.body.countrycode + req.body.mobile
    const pass1 = req.body.password
    const pass2 = req.body.confirmpassword
    if(pass1 === pass2)
    {   
        const hashedpass =await bcrypt.hash(pass1,saltRounds)
        const user = {
            firstname:fname,
            lastname:lname,
            email:email,
            mobile:mobile,
            password:hashedpass,
        }

        const userexist = await User.find({email:email})
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

const sendotp =  async (req,res) =>{
try{    const uid = req.query.uid
    console.log(uid+"from fetch")
    const udata = await User.findById({_id:uid})
    if(udata != null)
    {   
        const email = udata.email
        const userID = udata._id
        const OTP =  otp.createOTP()
        const hashedOTP = await otp.hashOTP(OTP)
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
            setTimeout(()=>{otp.removeOTP(savedOTP._id)},60000)
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

const verifyotp = async (req,res)=>{
    try {
        const otpfrom = req.body.otp
        const uid = req.body.uid
        const hashed = await otpModel.findOne({user_id:uid})
        if(hashed != null)
        {
            const isverified = otp.verifyOTP(otpfrom,hashed.otp)
            if(isverified)
            {
                calledpost = true
                const userconfirm = await User.findByIdAndUpdate({_id:uid},{$set:{isActive:1}})
                if(userconfirm != null)
                {   const id = userconfirm._id.toString()
                    const payload ={
                        _id:id,
                    }
                const token = jwttoken.createtoken(payload)
                    res.cookie("token",token)
                    res.redirect("/home")
                }
                else{
                    console.log("user is not confirmed")
                }
            }
            else{
                res.render("user/otpsignup",{err:"Invalid OTP !!"})
            }

        }
        else{
            res.render('user/otpsignup',{err:"OTP timed out!! Register again."})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const loadhome = async(req,res)=>{
    try {
        const uid = req.userid
        console.log("home "+uid)
        const data = await User.findById({_id:uid})
        // console.log(data)
        res.render('user/home')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
  loginredirect,
  loginload,
  login,
  signupload,
  sendotp,
  signup,
  otpload,
  verifyotp,
  loadhome,
  otplogin
};
