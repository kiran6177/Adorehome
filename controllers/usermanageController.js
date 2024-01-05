const User = require("../models/userSchema");

const loaduserview = async (req, res) => {
  try {
    const udata = await User.find({ type: "user" });
    res.render("admin/userview", { udata: udata });
  } catch (error) {
    console.log(error.message);
  }
};

const blockuser = async (req, res) => {
  try {
    const id = req.query.id;
    const userblock = await User.findOneAndUpdate(
      { _id: id, isActive: 1 },
      { $set: { isActive: 0 } }
    );
    console.log(userblock);
    if (userblock === null) {
      res.json({ err: "Already Blocked !!" });
    } else {
      res.json({ data: "User Blocked !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unblockuser = async (req, res) => {
  try {
    const id = req.query.id;
    const userunblock = await User.findOneAndUpdate(
      { _id: id, isActive: 0 },
      { $set: { isActive: 1 } }
    );
    console.log(userunblock);
    if (userunblock === null) {
      res.json({ err: "Already Unblocked!!" });
    } else {
      res.json({ data: "User unblocked !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteuser = async (req, res) => {
  try {
    const id = req.query.id;
    const udel = await User.findByIdAndDelete({ _id: id });
    if (udel != null) {
      res.redirect("/admin/users");
    } else {
      console.log("Error in deletion");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userSearch = async (req,res)=>{
  try {
    const key = req.body.usersearch
    const userdata = await User.find({$and:[{type:"user"},{$or:[{firstname:{$regex: new RegExp(key,'i')}},{lastname:{$regex:new RegExp(key,'i')}}]}]})
    if(userdata.length > 0)
    {
      res.render('admin/userview',{udata:userdata})
    }
    else{
      res.render('admin/users',{err:"No Users Found!!"})
    }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  loaduserview,
  blockuser,
  unblockuser,
  deleteuser,
  userSearch
};
