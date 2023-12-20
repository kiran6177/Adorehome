const Room = require("../models/roomSchema")


const loadroom = async (req,res)=>{
try{    
    const roomdat = await Room.find()
    if(roomdat)
    {
    res.render("admin/room",{data:roomdat})
    }
    else{
        res.render("admin/room")
        console.log(roomdat)
    }
}catch(error)
{
    console.log(error.message)
}
}

const roomadd = async (req,res)=>{
try{    
    const roomname = req.body.roomname
    const status = req.body.status
    const image = req.file.filename
    const data = {
        roomname:roomname,
        status:status,
        image:image
    }

    const roomdata = await Room.create(data)
    if(roomdata != null)
    {   
        res.redirect("/admin/rooms")
    }
}catch(error)
{
    console.log(error.message)
}
}

module.exports = {
    loadroom,
    roomadd
}