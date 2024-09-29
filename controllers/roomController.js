const Room = require("../models/roomSchema");
const fs = require("fs").promises;
const path = require("path");
const { uploadToCloudinary, destroyFromCloudinary } = require("../utils/cloudinary");
const ROOM_FOLDER = "adorehome/rooms";

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
    let image = await uploadToCloudinary(req.file.buffer,req.file.mimetype,ROOM_FOLDER);
    const data = {
      roomname: roomname,
      status: status,
      image,
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
      await destroyFromCloudinary(rooms.image,ROOM_FOLDER);
      let image = await uploadToCloudinary(req.file.buffer,req.file.mimetype,ROOM_FOLDER);

      roomData = {
        roomname,
        status,
        image,
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
