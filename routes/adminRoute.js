const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const adminAuth = require("../middleware/adminAuth")


router.get("/",adminAuth.isLogout,adminController.loginredirect)
router.get("/login",adminAuth.isLogout,adminController.loginload)
router.post("/login",adminAuth.isLogout,adminController.login)
router.get('/home',adminAuth.isLogin,adminController.loadhome)


module.exports = router