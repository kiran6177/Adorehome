const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../utils/multer");
const categoryController = require("../controllers/categoryController");
const roomController = require("../controllers/roomController");
const brandController = require("../controllers/brandController");
const productController = require("../controllers/productController");
const usermanageController = require("../controllers/usermanageController");
const profileController = require("../controllers/profileController");
const orderController = require("../controllers/orderController");
const reportController = require("../controllers/reportController");
const dashboardController = require("../controllers/dashboardController");
const couponController = require('../controllers/couponController')
const bannerController = require('../controllers/bannerController')
const offerController = require('../controllers/offerController')

router.get("/", adminAuth.isLogout, adminController.loginredirect);
router.get("/login", adminAuth.isLogout, adminController.loginload);
router.post("/login", adminAuth.isLogout, adminController.login);
router.get("/logout", adminAuth.isLogin, profileController.logout);
router.post("/", adminAuth.isLogin, adminController.search);

router.get("/home", adminAuth.isLogin, adminController.loadhome);
router.get(
  "/home/weekreport",
  adminAuth.isLogin,
  dashboardController.weekReport
);
router.get(
  "/home/monthreport",
  adminAuth.isLogin,
  dashboardController.monthReport
);
router.get(
  "/home/yearreport",
  adminAuth.isLogin,
  dashboardController.yearReport
);
router.get(
  "/home/categoryreport",
  adminAuth.isLogin,
  dashboardController.categorySales
);
router.get(
  "/home/propage",
  adminAuth.isLogin,
  dashboardController.propage
);
router.get(
  "/home/stockpage",
  adminAuth.isLogin,
  dashboardController.stockPage
);

router.get("/products", adminAuth.isLogin, productController.loadproducts);
router.get(
  "/products/addproduct",
  adminAuth.isLogin,
  productController.loadaddproducts
);
router.post(
  "/products/addproduct",
  adminAuth.isLogin,
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "imgs", maxCount: 4 },
  ]),
  productController.addproducts
);
router.get(
  "/products/editproduct",
  adminAuth.isLogin,
  productController.loadeditproducts
);
router.post(
  "/products/editproduct",
  adminAuth.isLogin,
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "img1" },
    { name: "img2" },
    { name: "img3" },
    { name: "img4" },
  ]),
  productController.editproducts
);
router.get(
  "/products/deleteproduct",
  adminAuth.isLogin,
  productController.deleteproduct
);
router.get(
  "/products/editproduct/remimg",
  adminAuth.isLogin,
  productController.removeImage
);

router.get("/category", adminAuth.isLogin, categoryController.loadcategory);
router.post(
  "/category",
  adminAuth.isLogin,
  upload.single("catimage"),
  categoryController.categoryadd
);
router.get(
  "/category/edit",
  adminAuth.isLogin,
  categoryController.loadeditcategory
);
router.post(
  "/category/edit",
  adminAuth.isLogin,
  upload.single("catimage"),
  categoryController.editcategory
);
router.get(
  "/category/delete",
  adminAuth.isLogin,
  categoryController.deletecategory
);

router.get("/rooms", adminAuth.isLogin, roomController.loadroom);
router.post(
  "/rooms",
  adminAuth.isLogin,
  upload.single("roomimage"),
  roomController.roomadd
);

router.get("/brands", adminAuth.isLogin, brandController.loadbrand);
router.post(
  "/brands",
  adminAuth.isLogin,
  upload.single("brandimage"),
  brandController.brandadd
);

router.get("/users", adminAuth.isLogin, usermanageController.loaduserview);
router.post("/users", adminAuth.isLogin, usermanageController.userSearch);

router.get(
  "/users/deleteuser",
  adminAuth.isLogin,
  usermanageController.deleteuser
);
router.get(
  "/users/blockuser",
  adminAuth.isLogin,
  usermanageController.blockUnblockUser
);
router.get(
  "/users/unblockuser",
  adminAuth.isLogin,
  usermanageController.blockUnblockUser
);
router.get(
  "/users/page",
  adminAuth.isLogin,
  usermanageController.pageSearch
);

router.get("/profile", adminAuth.isLogin, profileController.loadProfile);
router.post("/profile", adminAuth.isLogin, profileController.editProfile);

router.get("/orders", adminAuth.isLogin, orderController.loadOrder);
router.get(
  "/orders/orderdetail",
  adminAuth.isLogin,
  orderController.loadOrderDetail
);
router.get(
  "/orders/orderdetail/changestatus",
  adminAuth.isLogin,
  orderController.changeStatus
);
router.get(
  "/orders/orderdetail/initiaterefund",
  adminAuth.isLogin,
  orderController.initiateRefund
);

router.get("/salesreport", adminAuth.isLogin, reportController.loadReport);
router.get(
  "/salesreport/dailypro",
  adminAuth.isLogin,
  reportController.dailyProducts
);
router.get(
  "/salesreport/weeklypro",
  adminAuth.isLogin,
  reportController.weeklyProducts
);
router.get(
  "/salesreport/monthlypro",
  adminAuth.isLogin,
  reportController.monthlyProducts
);
router.get(
  "/salesreport/yearlypro",
  adminAuth.isLogin,
  reportController.yearlyProducts
);
router.get(
  "/salesreport/dailyturn",
  adminAuth.isLogin,
  reportController.dailyTurnover
);
router.get(
  "/salesreport/weeklyturn",
  adminAuth.isLogin,
  reportController.weeklyTurnover
);
router.get(
  "/salesreport/monthlyturn",
  adminAuth.isLogin,
  reportController.monthlyTurnover
);
router.get(
  "/salesreport/yearlyturn",
  adminAuth.isLogin,
  reportController.yearlyTurnover
);

router.get('/salesreport/getexcelpro',adminAuth.isLogin,reportController.getExcelData)
router.get('/salesreport/getpdfpro',adminAuth.isLogin,reportController.getPdfData)


router.get("/coupon",adminAuth.isLogin,couponController.loadCoupon)
router.post("/coupon",adminAuth.isLogin,couponController.addCoupon)
router.get("/coupon/edit",adminAuth.isLogin,couponController.loadEditCoupon)
router.post("/coupon/edit",adminAuth.isLogin,couponController.editCoupon)

router.get('/banner',adminAuth.isLogin,bannerController.loadBanner)
router.post('/banner',adminAuth.isLogin,upload.single('bannerimg'),bannerController.addBanner)
router.get('/banner/edit',adminAuth.isLogin,bannerController.loadEditBanner)
router.post('/banner/edit',adminAuth.isLogin,upload.single('bannerimg'),bannerController.editBanner)
router.get('/banner/delete',adminAuth.isLogin,bannerController.deleteBanner)


router.get('/offer',adminAuth.isLogin,offerController.loadOffer)
router.post('/offer',adminAuth.isLogin,upload.single('offerimage'),offerController.addOffer)
router.get('/offer/edit',adminAuth.isLogin,offerController.loadEditOffer)
router.post('/offer/edit',adminAuth.isLogin,upload.single('offerimage'),offerController.editOffer)
router.get('/offer/delete',adminAuth.isLogin,offerController.deleteOffer)

module.exports = router;
