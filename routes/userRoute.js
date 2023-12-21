const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userAuth = require("../middleware/userAuth")
const userproductController = require('../controllers/userproductController')

router.get('/',userController.loginredirect)

router.get('/login',userAuth.isLogout,userController.loginload)
router.post('/login',userAuth.isLogout,userController.login)

router.get('/signup',userAuth.isLogout,userController.signupload)
router.post('/signup',userAuth.isLogout,userController.signup)
router.get('/sendotp',userAuth.isLogout,userController.sendotp)
router.get('/otpload',userAuth.isLogout,userController.otpload)
router.post('/otpload',userAuth.isLogout,userController.verifyotp)
router.post('/otplogin',userAuth.isLogout,userController.verifyotplogin)

router.get('/home',userAuth.isLogin,userController.loadhome)
router.get('/otplogin',userAuth.isLogout,userController.otplogin)

router.get('/products',userAuth.isLogin,userproductController.loadproducts)
router.get('/products/viewproduct',userAuth.isLogin,userproductController.loadproductdetail)

module.exports = router