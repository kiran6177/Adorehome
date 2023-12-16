const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/',userController.loginredirect)

router.get('/login',userController.loginload)
router.post('/login',userController.login)

router.get('/signup',userController.signupload)
router.post('/signup',userController.signup)
router.get('/sendotp',userController.sendotp)
router.get('/otpload',userController.otpload)
router.post('/verifyotp',userController.verifyotp)
router.get('/home',userController.loadhome)
router.get('/otplogin',userController.otplogin)


module.exports = router