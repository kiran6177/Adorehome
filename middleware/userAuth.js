const jwttoken = require("../utils/jwt");
const User = require("../models/userSchema");

const isLogin = async (req, res, next) => {
  if (req.cookies.token) {
    const decoded = await jwttoken.verifytoken(req.cookies.token);
    // console.log(decoded)
    if (decoded) {
      const udata = await User.findOne({ _id: decoded._id, isActive: 1 });
      // console.log(udata)
      if (udata === null) {
        res.redirect("/login");
      } else {
        req.userid = decoded._id;
        next();
      }
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};

const isHome = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const decoded = await jwttoken.verifytoken(req.cookies.token);
      // console.log(decoded)
      if (decoded) {
        const udata = await User.findOne({ _id: decoded._id, isActive: 1 });
        // console.log(udata)
        if (udata === null) {
          next();
        } else {
          req.userid = decoded._id;
          next();
        }
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  if (req.cookies.token != undefined) {
    const decoded = await jwttoken.verifytoken(req.cookies.token);
    // console.log(decoded)
    if (decoded) {
      const udata = await User.findOne({ _id: decoded._id, isActive: 1 });
      if (udata === null) {
        next();
      } else {
        req.userid = decoded._id;
        res.redirect("/");
      }
    } else {
      // console.log("error in authentication")
      next();
    }
  } else {
    next();
  }
};

module.exports = {
  isLogin,
  isLogout,
  isHome
};
