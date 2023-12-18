const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const adminAuth = require("../middleware/adminAuth")
const upload = require('../utils/multer')
const categoryController = require("../controllers/categoryController")
const roomController = require("../controllers/roomController")
const brandController = require('../controllers/brandController')

router.get("/",adminAuth.isLogout,adminController.loginredirect)
router.get("/login",adminAuth.isLogout,adminController.loginload)
router.post("/login",adminAuth.isLogout,adminController.login)
router.get('/home',adminAuth.isLogin,adminController.loadhome)
router.get("/products",adminAuth.isLogin,adminController.loadproducts)
router.get("/products/addproduct",adminAuth.isLogin,adminController.loadaddproducts)
router.get("/category",adminAuth.isLogin,categoryController.loadcategory)
router.post("/category",adminAuth.isLogin,upload.single('catimage'),categoryController.categoryadd)
router.get("/rooms",adminAuth.isLogin,roomController.loadroom)
router.post("/rooms",adminAuth.isLogin,upload.single('roomimage'),roomController.roomadd)
router.get("/brands",adminAuth.isLogin,brandController.loadbrand)
router.post("/brands",adminAuth.isLogin,upload.single('brandimage'),brandController.brandadd)



module.exports = router