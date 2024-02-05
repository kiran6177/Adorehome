const User = require("../models/userSchema");

const loadProfile = async (req, res) => {
  try {
    const adminid = req.adminid;
    const admindata = await User.findById({ _id: adminid });
    if (admindata != null) {
      res.render("admin/adminprofile", { admindata: admindata });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editProfile = async (req, res) => {
  try {
    const adminid = req.adminid;
    const { adminname, adminemail, adminmobile } = req.body;
    const nameSplit = adminname.split(" ");
    const firstname = nameSplit[0];
    const lastname = nameSplit.slice(1).join(" ");
    const datatoupdate = {
      firstname,
      lastname,
      email: adminemail,
      mobile: adminmobile,
    };

    const adminupdate = await User.findByIdAndUpdate(
      { _id: adminid },
      { $set: datatoupdate }
    );
    if (adminupdate != null) {
      res.redirect("/admin/profile");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("admintoken").json({ data: "Logout Successful!!" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadProfile,
  editProfile,
  logout,
};
