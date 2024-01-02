const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userAuth = require("../middleware/userAuth")
const userproductController = require('../controllers/userproductController')
const userCategoryController = require('../controllers/userCategoryController')
const userCartController = require('../controllers/userCartController')


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

router.get('/category',userAuth.isLogin,userCategoryController.loadCategory)

router.get('/cart',userAuth.isLogin,userCartController.loadCart)
router.get('/cart/addcart',userAuth.isLogin,userCartController.addToCart)
router.get('/cart/qtyadd',userAuth.isLogin,userCartController.qtyAdd)
router.get('/cart/qtysub',userAuth.isLogin,userCartController.qtySub)
router.get('/cart/delcart',userAuth.isLogin,userCartController.delCart)


module.exports = router