const User = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const jwttoken = require("../utils/jwt");
const Otp = require("../utils/otp");
const mailer = require("../utils/mailer");
const bcrypt = require("bcrypt");
const Product = require("../models/productSchema");
const saltRounds = 10;
const Banner = require("../models/bannerSchema");
const jwt = require("jsonwebtoken");
const forgotMailer = require("../utils/forgotmailer");
const { ObjectId } = require("mongodb");
const Category = require("../models/categorySchema");
const Room = require("../models/roomSchema");
const loginLoad = async (req, res) => {
  let footcdata = await Category.aggregate([
    { $match: { status: "1", isListed: 0 } },
    { $limit: 4 },
  ]);
  let footrdata = await Room.aggregate([
    { $match: { status: "1" } },
    { $limit: 4 },
  ]);
  res.render("user/userlogin", { footcdata, footrdata });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const loggeduser = await User.findOne({
    email: email,
    type: "user",
    isActive: 1,
  });
  let footcdata = await Category.aggregate([
    { $match: { status: "1", isListed: 0 } },
    { $limit: 4 },
  ]);
  let footrdata = await Room.aggregate([
    { $match: { status: "1" } },
    { $limit: 4 },
  ]);
  if (loggeduser != null) {
    const passtrue = await bcrypt.compare(password, loggeduser.password);
    if (passtrue) {
      res.redirect(`/otplogin?uid=${loggeduser._id}`);
    } else {
      res.render("user/userlogin", {
        footcdata,
        footrdata,
        err: "Invalid Password",
      });
    }
  } else {
    res.render("user/userlogin", { footrdata, footcdata, err: "Invalid User" });
  }
};

const signupLoad = async (req, res) => {
  let footcdata = await Category.aggregate([
    { $match: { status: "1", isListed: 0 } },
    { $limit: 4 },
  ]);
  let footrdata = await Room.aggregate([
    { $match: { status: "1" } },
    { $limit: 4 },
  ]);
  res.render("user/usersignup", { footcdata, footrdata });
};

let calledpost;

const otpLoad = async (req, res) => {
  const { uid } = req.query;
  // console.log("otppload "+uid)
  let footcdata = await Category.aggregate([
    { $match: { status: "1", isListed: 0 } },
    { $limit: 4 },
  ]);
  let footrdata = await Room.aggregate([
    { $match: { status: "1" } },
    { $limit: 4 },
  ]);
  calledpost = false;
  try {
    res.render("user/otpsignup", { footcdata, footrdata, uid: uid });
    setTimeout(() => {
      if (!calledpost) {
        console.log("entered into called post");
        setTimeout(() => {
          deleteUser(uid);
        }, 120000);
      } else {
        console.log("user not deleted");
      }
    }, 300000);
  } catch (error) {
    console.log(error.message);
  }
};

const otpLogin = async (req, res) => {
  try {
    const { uid } = req.query;
    console.log("otppload " + uid);
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    res.render("user/otplogin", { footcdata, footrdata, uid: uid });
  } catch (error) {
    console.log(error.message);
  }
};

async function deleteUser(uid) {
  try {
    const deleted = await User.findOneAndDelete({ _id: uid });
    if (deleted != null) {
      console.log("user deleted");
    } else {
      console.log("error in deletion");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      countrycode,
      mobile,
      password,
      confirmpassword,
    } = req.body;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    if (password === confirmpassword) {
      const hashedpass = await bcrypt.hash(password, saltRounds);
      const user = {
        firstname,
        lastname,
        email,
        mobile: countrycode + mobile,
        password: hashedpass,
      };

      const userexist = await User.find({
        email: email,
        type: "user",
        isActive: 1,
      });
      // console.log(userexist)
      if (userexist.length === 0) {
        const userdata = await User.create(user);
        if (userdata != null) {
          const userID = userdata._id;
          console.log(userID);
          res.redirect(`/otpload?uid=${userID}`);
        } else {
          res.redirect("/signup");
        }
      } else {
        res.render("user/usersignup", {
          footcdata,
          footrdata,
          err: "Account already exist !!",
        });
      }
    } else {
      res.render("user/usersignup", {
        footcdata,
        footrdata,
        err: "Password does not Match !!",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { uid } = req.query;
    console.log(uid + "from fetch");
    const udata = await User.findById({ _id: uid });
    if (udata != null) {
      const email = udata.email;
      const userID = udata._id;
      const OTP = Otp.createOTP();
      console.log(OTP);
      const hashedOTP = await Otp.hashOTP(OTP);
      console.log(hashedOTP);
      const otptosave = {
        user_id: userID,
        otp: hashedOTP,
        createdAt: Date.now(),
        expireAt: Date.now() + 60000,
      };
      const savedOTP = await otpModel.create(otptosave);
      //  calledpost = true
      if (savedOTP != null) {
        console.log(savedOTP._id + "OTP saved");
        const mailres = mailer.sendmail(email, OTP);
        if (mailres) {
          res.json({ data: "OTP send successfully!!" });
          setTimeout(() => {
            Otp.removeOTP(savedOTP._id);
          }, 60000);
        } else {
          res.json({ err: "Error in sending mail!! Try Again." });
        }
      } else {
        console.log(savedOTP);
      }
    } else {
      res.json({ err: "User doesn't exist !!.Please register again." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyOtpLogin = async (req, res) => {
  try {
    const { otp, uid } = req.body;
    const hashed = await otpModel.findOne({ user_id: uid });
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    if (hashed != null) {
      console.log("hashed" + hashed);

      const isverified = await Otp.verifyOTP(otp, hashed.otp);
      console.log(isverified);

      if (isverified) {
        console.log(isverified);
        const userconfirm = await User.findById({ _id: uid });
        if (userconfirm != null) {
          calledpost = true;
          const id = userconfirm._id.toString();
          const payload = {
            _id: id,
          };
          const token = jwttoken.createtoken(payload);
          res.cookie("token", token, { secure: true, httpOnly: true });
          res.redirect("/");
        } else {
          console.log("user is not confirmed");
        }
      } else {
        res.render("user/otplogin", {
          footcdata,
          footrdata,
          err: "Invalid OTP !!",
          uid: uid,
        });
      }
    } else {
      res.render("user/otplogin", {
        footcdata,
        footrdata,
        err: "OTP timed out!! Register again.",
        uid: uid,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, uid } = req.body;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    const hashed = await otpModel.findOne({ user_id: uid });
    if (hashed != null) {
      const isverified = await Otp.verifyOTP(otp, hashed.otp);
      if (isverified) {
        const userconfirm = await User.findByIdAndUpdate(
          { _id: uid },
          { $set: { isActive: 1 } }
        );
        if (userconfirm != null) {
          calledpost = true;
          const id = userconfirm._id.toString();
          const payload = {
            _id: id,
          };
          const token = jwttoken.createtoken(payload);
          res.cookie("token", token, { secure: true, httpOnly: true });
          res.redirect("/");
        } else {
          console.log("user is not confirmed");
        }
      } else {
        res.render("user/otpsignup", {
          footcdata,
          footrdata,
          err: "Invalid OTP !!",
          uid: uid,
        });
      }
    } else {
      res.render("user/otpsignup", {
        footcdata,
        footrdata,
        err: "OTP timed out!! Register again.",
        uid: uid,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    let data;
    if (req.userid) {
      const uid = req.userid;
      console.log("home " + uid);
      data = await User.findById({ _id: uid }).populate({
        path: "cart.product_id",
      });
    }

    let pdata = await Product.aggregate([
      { $match: { isBlocked: 0 } },
      {
        $lookup: {
          from: "offers",
          localField: "offer_id",
          foreignField: "_id",
          as: "offerdata",
        },
      },
      { $limit: 8 },
    ]);
    let cdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 3 },
    ]);
    let rdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 2 },
    ]);

    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);

    // console.log(rdata)
    //  console.log(pdata[0].offerdata)
    if (req.userid) {
      res.render("user/home", {
        products: pdata,
        udata: data,
        rdata: rdata,
        cdata: cdata,
        footcdata,
        footrdata,
      });
    } else {
      res.render("user/home", {
        products: pdata,
        rdata: rdata,
        cdata: cdata,
        footcdata,
        footrdata,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getBanner = async (req, res) => {
  try {
    const bannerdata = await Banner.aggregate([{ $match: { status: "1" } }]);
    if (bannerdata) {
      res.json({ banner: bannerdata });
    } else {
      res.json({ bannererr: "Cannot fetch banner." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ data: "Logout Successful." });
  } catch (error) {
    console.log(error.message);
  }
};

const loadEmailPage = async (req, res) => {
  try {
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    res.render("user/enteremail", { footcdata, footrdata });
  } catch (error) {
    console.log(error.message);
  }
};

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    const isRegisteredUser = await User.findOne({ email: email });
    if (isRegisteredUser) {
      const payload = { id: isRegisteredUser._id };
      const secret = process.env.JWT_secret + isRegisteredUser.password;
      const token = jwt.sign(payload, secret, { expiresIn: "10m" });
      const link = `https://www.adorehome.site/resetpassword?id=${isRegisteredUser._id}&token=${token}`;
      console.log(link);
      const mailSend = forgotMailer.sendForgotmail(
        isRegisteredUser.email,
        link
      );
      if (mailSend) {
        console.log("mail");
        res.render("user/enteremail", {
          footcdata,
          footrdata,
          success: "A link is send to your e-mail.",
        });
      }
    } else {
      res.render("user/enteremail", {
        footcdata,
        footrdata,
        error: "Invalid E-mail.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("hello");
    const { id, token } = req.query;
    const matchUser = await User.aggregate([
      { $match: { _id: new ObjectId(id), type: "user" } },
    ]);
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    console.log(matchUser);
    if (matchUser.length > 0) {
      if (token) {
        const secret = process.env.JWT_secret + matchUser[0].password;
        const isVerified = jwt.verify(token, secret);
        console.log(isVerified);
        if (isVerified) {
          res.render("user/forgotpassword", {
            footcdata,
            footrdata,
            id: matchUser[0]._id,
          });
        } else {
          console.log("hi");
          res.status(404);
        }
      } else {
        res.status(404);
      }
    } else {
      res.status(404);
    }
  } catch (error) {
    res.redirect("/error");
    console.log(error.message);
  }
};

const reset = async (req, res) => {
  try {
    const { newpassword, confirmpassword, uid } = req.body;
    let footcdata = await Category.aggregate([
      { $match: { status: "1", isListed: 0 } },
      { $limit: 4 },
    ]);
    let footrdata = await Room.aggregate([
      { $match: { status: "1" } },
      { $limit: 4 },
    ]);
    if (newpassword === confirmpassword) {
      const hashed = await bcrypt.hash(confirmpassword, saltRounds);
      if (hashed) {
        const changePassword = await User.findByIdAndUpdate(
          { _id: uid },
          { $set: { password: hashed } }
        );
        if (changePassword) {
          res.redirect("/");
        }
      } else {
        res.render("user/forgotpassword", { footcdata, footrdata });
      }
    } else {
      res.render("user/forgotpassword", { footcdata, footrdata });
    }
  } catch (error) {
    console.log(error.message);
  }
};

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
  reset,
};
