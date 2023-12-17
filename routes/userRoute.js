const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userAuth = require("../middleware/userAuth")

router.get('/',userController.loginredirect)

router.get('/login',userAuth.isLogout,userController.loginload)
router.post('/login',userAuth.isLogout,userController.login)

router.get('/signup',userAuth.isLogout,userController.signupload)
router.post('/signup',userAuth.isLogout,userController.signup)
router.get('/sendotp',userAuth.isLogout,userController.sendotp)
router.get('/otpload',userAuth.isLogout,userController.otpload)
router.post('/verifyotp',userAuth.isLogout,userController.verifyotp)
router.get('/home',userAuth.isLogin,userController.loadhome)
router.get('/otplogin',userAuth.isLogout,userController.otplogin)


module.exports = router