const Room = require("../models/roomSchema");
const fs = require("fs").promises;
const path = require("path");

const loadroom = async (req, res) => {
  try {
    const roomdat = await Room.find({ isListed: 0 });
    if (roomdat) {
      res.render("admin/room", { data: roomdat });
    } else {
      res.render("admin/room");
      console.log(roomdat);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const roomadd = async (req, res) => {
  try {
    const roomname = req.body.roomname;
    const status = req.body.status;
    const image = req.file.filename;
    const data = {
      roomname: roomname,
      status: status,
      image: image,
    };

    const roomdata = await Room.create(data);
    if (roomdata != null) {
      res.redirect("/admin/rooms");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const loadEditRoom = async (req, res) => {
  try {
    const { id } = req.query;
    const roomdata = await Room.findById({ _id: id });
    res.render("admin/editroom", { roomdata });
  } catch (error) {
    console.log(error.message);
  }
};

const editRoom = async (req, res) => {
  try {
    const { id, roomname, status } = req.body;
    let roomData;
    if (req.file) {
      const rooms = await Room.findById({ _id: id });
      await fs.unlink(path.join(__dirname, "../assets", rooms.image));
      roomData = {
        roomname,
        status,
        image: req.file.filename,
      };
    } else {
      roomData = {
        roomname,
        status,
      };
    }

    const brandUpdate = await Room.findByIdAndUpdate(
      { _id: id },
      { $set: roomData }
    );
    res.redirect("/admin/rooms");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.query;
    const roomdata = await Room.findByIdAndUpdate(
      { _id: id },
      { $set: { isListed: 1 } }
    );
    res.redirect("/admin/rooms");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  loadroom,
  roomadd,
  loadEditRoom,
  editRoom,
  deleteRoom,
};
