const User = require("../models/userSchema");

const loaduserview = async (req, res) => {
  try {
    const udata = await User.find({ type: "user" });
    res.render("admin/userview", { udata: udata });
  } catch (error) {
    console.log(error.message);
  }
};

const blockUnblockUser = async(req,res)=>{
  try {
    const {id} = req.query
    const userStatus = await User.findById({_id:id})
    if(userStatus!= null)
    {
      if(userStatus.isActive === 1)
      {
        const userblock = await User.findOneAndUpdate(
          { _id: id},
          { $set: { isActive: 0 }},{new:true} 
        );
        console.log(userblock)
        if(userblock!==null)
        {
          res.json({blocked:"User Blocked"})
        }
        else{
          res.json({err:"Error in Blocking"})
        }
      }
      else{
        const userunblock = await User.findOneAndUpdate(
          { _id: id},
          { $set: { isActive: 1 } },{new:true}
        );
        console.log(userunblock)
        if(userunblock!==null)
        {
          res.json({unblocked:"User Unblocked"})
        }
        else{
          res.json({err:"Error in Unblocking"})
        }
      }
    }
    else{

    }
  } catch (error) {
    console.log(error.message)
  }
}


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
  deleteuser,
  userSearch,
  blockUnblockUser
};
