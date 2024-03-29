const User = require("../models/userSchema");

const loaduserview = async (req, res) => {
  try {
    let page = req.query.page ? req.query.page : 1;
    const udata = await User.find({ type: "user" })
      .skip((page - 1) * 8)
      .limit(8);
    const userCount = await User.aggregate([
      { $match: { type: "user" } },
      { $count: "usercount" },
    ]);
    console.log(userCount);

    res.render("admin/userview", {
      udata: udata,
      totalusercount: userCount.length > 0 ? userCount[0].usercount : 0,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const blockUnblockUser = async (req, res) => {
  try {
    const { id } = req.query;
    const userStatus = await User.findById({ _id: id });
    if (userStatus != null) {
      if (userStatus.isActive === 1) {
        const userblock = await User.findOneAndUpdate(
          { _id: id },
          { $set: { isActive: 0 } },
          { new: true }
        );
        console.log(userblock);
        if (userblock !== null) {
          res.json({ blocked: "User Blocked" });
        } else {
          res.json({ err: "Error in Blocking" });
        }
      } else {
        const userunblock = await User.findOneAndUpdate(
          { _id: id },
          { $set: { isActive: 1 } },
          { new: true }
        );
        console.log(userunblock);
        if (userunblock !== null) {
          res.json({ unblocked: "User Unblocked" });
        } else {
          res.json({ err: "Error in Unblocking" });
        }
      }
    } else {
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

const userSearch = async (req, res) => {
  try {
    const key = req.body.usersearch;
    const userdata = await User.find({
      $and: [
        { type: "user" },
        {
          $or: [
            { firstname: { $regex: new RegExp(key, "i") } },
            { lastname: { $regex: new RegExp(key, "i") } },
          ],
        },
      ],
    });
    const userCount = await User.aggregate([
      {
        $match: {
          $and: [
            { type: "user" },
            {
              $or: [
                { firstname: { $regex: new RegExp(key, "i") } },
                { lastname: { $regex: new RegExp(key, "i") } },
              ],
            },
          ],
        },
      },
      { $count: "usercount" },
    ]);
    if (userdata.length > 0) {
      console.log(userCount);
      res.render("admin/userview", {
        udata: userdata,
        totalusercount: userCount.length > 0 ? userCount[0].usercount : 0,
      });
    } else {
      res.render("admin/userview", { err: "No Users Found!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const pageSearch = async (req, res) => {
  try {
    let page = req.query.page ? req.query.page : 1;
    let search = req.query.search ? req.query.search : null;
    let udata;
    console.log(page);
    if (search != null) {
      udata = await User.find({
        $and: [
          { type: "user" },
          {
            $or: [
              { firstname: { $regex: new RegExp(search, "i") } },
              { lastname: { $regex: new RegExp(search, "i") } },
            ],
          },
        ],
      })
        .skip((page - 1) * 8)
        .limit(8);
    } else {
      udata = await User.find({ type: "user" })
        .skip((page - 1) * 8)
        .limit(8);
    }
    console.log(udata);
    if (udata.length > 0) {
      res.json({ udata: udata });
    } else {
      res.json({ uerr: "NO USERS FOUND!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loaduserview,
  deleteuser,
  userSearch,
  blockUnblockUser,
  pageSearch,
};
