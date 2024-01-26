const express = require("express")
const nocache = require('nocache')
const path = require('path')
const cookieParser = require("cookie-parser")


const app = express()
require('dotenv').config()

const PORT = process.env.PORT 

const connectDB = require('./config/config')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

connectDB.connection()

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use("/public",express.static(path.join(__dirname,"/public")))
app.use('/assets',express.static(path.join(__dirname,'/assets')))

app.use(nocache())

app.use("/admin",adminRoute)
app.use("/admin",(req, res)=>{
    res.status(404).render('admin/admin404'); 
});
app.use("/",userRoute)

app.use("/",(req, res)=>{
    res.status(404).render('user/user404'); 
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})