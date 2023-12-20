const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const adminAuth = require("../middleware/adminAuth")
const upload = require('../utils/multer')
const categoryController = require("../controllers/categoryController")
const roomController = require("../controllers/roomController")
const brandController = require('../controllers/brandController')
const productController = require('../controllers/productController')
const usermanageController = require('../controllers/usermanageController')

router.get("/",adminAuth.isLogout,adminController.loginredirect)
router.get("/login",adminAuth.isLogout,adminController.loginload)
router.post("/login",adminAuth.isLogout,adminController.login)
router.get('/home',adminAuth.isLogin,adminController.loadhome)

router.get("/products",adminAuth.isLogin,productController.loadproducts)
router.get("/products/addproduct",adminAuth.isLogin,productController.loadaddproducts)
router.post("/products/addproduct",adminAuth.isLogin,upload.fields([{name:'mainimage'},{name:'img1'},{name:'img2'},{name:'img3'},{name:'img4'}]),productController.addproducts)
router.get("/products/editproduct",adminAuth.isLogin,productController.loadeditproducts)
router.post("/products/editproduct",adminAuth.isLogin,upload.fields([{name:'mainimage'},{name:'img1'},{name:'img2'},{name:'img3'},{name:'img4'}]),productController.editproducts)
router.get("/products/deleteproduct",adminAuth.isLogin,productController.deleteproduct)

router.get("/category",adminAuth.isLogin,categoryController.loadcategory)
router.post("/category",adminAuth.isLogin,upload.single('catimage'),categoryController.categoryadd)
router.get('/category/edit',adminAuth.isLogin,categoryController.loadeditcategory)
router.post("/category/edit",adminAuth.isLogin,upload.single('catimage'),categoryController.editcategory)
router.get('/category/delete',adminAuth.isLogin,categoryController.deletecategory)

router.get("/rooms",adminAuth.isLogin,roomController.loadroom)
router.post("/rooms",adminAuth.isLogin,upload.single('roomimage'),roomController.roomadd)

router.get("/brands",adminAuth.isLogin,brandController.loadbrand)
router.post("/brands",adminAuth.isLogin,upload.single('brandimage'),brandController.brandadd)

router.get("/users",adminAuth.isLogin,usermanageController.loaduserview)
router.get("/users/deleteuser",adminAuth.isLogin,usermanageController.deleteuser)
router.get("/users/blockuser",adminAuth.isLogin,usermanageController.blockuser)
router.get("/users/unblockuser",adminAuth.isLogin,usermanageController.unblockuser)



module.exports = router