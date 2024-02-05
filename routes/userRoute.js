const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userAuth = require("../middleware/userAuth");
const userproductController = require("../controllers/userproductController");
const userCategoryController = require("../controllers/userCategoryController");
const userCartController = require("../controllers/userCartController");
const userProfileController = require("../controllers/userProfileController");
const userRoomController = require("../controllers/userRoomController");
const userAddressController = require("../controllers/userAddressController");
const userCheckoutController = require("../controllers/userCheckoutController");
const userPaymentController = require("../controllers/userPaymentController");
const userOrderController = require("../controllers/userOrderController");
const userWishlistController = require("../controllers/userWishlistController");
const userBrandController = require("../controllers/userBrandController");
const userCouponController = require("../controllers/userCouponController");
const userOfferController = require("../controllers/userOfferController");
const userWalletController = require("../controllers/userWalletController");
// router.get('/',userController.loginRedirect)

router.get("/login", userAuth.isLogout, userController.loginLoad);
router.post("/login", userAuth.isLogout, userController.login);
router.get("/forgotpassword", userAuth.isLogout, userController.loadEmailPage);
router.post("/forgotpassword", userAuth.isLogout, userController.sendEmail);
router.get("/resetpassword", userController.resetPassword);
router.post("/resetpassword", userController.reset);
router.get("/logout", userAuth.isLogin, userController.logout);

router.get("/signup", userAuth.isLogout, userController.signupLoad);
router.post("/signup", userAuth.isLogout, userController.signup);
router.get("/sendotp", userAuth.isLogout, userController.sendOtp);
router.get("/otpload", userAuth.isLogout, userController.otpLoad);
router.post("/otpload", userAuth.isLogout, userController.verifyOtp);

router.get("/", userAuth.isHome, userController.loadHome);
router.get("/getbanner", userAuth.isHome, userController.getBanner);
router.get("/otplogin", userAuth.isLogout, userController.otpLogin);
router.post("/otplogin", userAuth.isLogout, userController.verifyOtpLogin);

router.get("/products", userAuth.isLogin, userproductController.loadProducts);
router.get(
  "/products/viewproduct",
  userAuth.isLogin,
  userproductController.loadProductDetail
);
router.get(
  "/products/searchpro",
  userAuth.isLogin,
  userproductController.proSearch
);
router.get(
  "/products/filterpro",
  userAuth.isLogin,
  userproductController.proFilter
);
router.get(
  "/products/searchfilterpage",
  userAuth.isLogin,
  userproductController.productListFetch
);

router.get("/category", userAuth.isLogin, userCategoryController.loadCategory);
router.get("/category/products",userAuth.isLogin,userCategoryController.loadCatProducts)

router.get("/room", userAuth.isLogin, userRoomController.loadRoom);
router.get("/room/products",userAuth.isLogin,userRoomController.loadRoomProducts)

router.get("/brand", userAuth.isLogin, userBrandController.loadBrands);
router.get("/brand/products", userAuth.isLogin, userBrandController.loadProBrands);


router.get("/cart", userAuth.isLogin, userCartController.loadCart);
router.get("/cart/addcart", userAuth.isLogin, userCartController.addToCart);
router.get("/cart/qtyadd", userAuth.isLogin, userCartController.qtyAdd);
router.get("/cart/qtysub", userAuth.isLogin, userCartController.qtySub);
router.get("/cart/delcart", userAuth.isLogin, userCartController.delCart);

router.get("/profile", userAuth.isLogin, userProfileController.profileLoad);
router.get(
  "/profile/editprofile",
  userAuth.isLogin,
  userProfileController.editProfileLoad
);
router.post(
  "/profile/editprofile",
  userAuth.isLogin,
  userProfileController.editProfile
);
router.get(
  "/profile/changepassword",
  userAuth.isLogin,
  userProfileController.changePasswordLoad
);
router.post(
  "/profile/changepassword",
  userAuth.isLogin,
  userProfileController.changePassword
);

router.get("/address", userAuth.isLogin, userAddressController.loadAddress);
router.get(
  "/address/addaddress",
  userAuth.isLogin,
  userAddressController.loadAddAddress
);
router.post(
  "/address/addaddress",
  userAuth.isLogin,
  userAddressController.saveAddress
);
router.get(
  "/address/editaddress",
  userAuth.isLogin,
  userAddressController.loadEditAddress
);
router.post(
  "/address/editaddress",
  userAuth.isLogin,
  userAddressController.editAddress
);
router.get(
  "/address/removeaddress",
  userAuth.isLogin,
  userAddressController.removeAddress
);

router.get("/checkout", userAuth.isLogin, userCheckoutController.loadCheckout);

router.get("/payment", userAuth.isLogin, userPaymentController.loadPayment);
router.get(
  "/placeorder",
  userAuth.isLogin,
  userPaymentController.paymentConfirm
);
router.post(
  "/verifyPayment",
  userAuth.isLogin,
  userPaymentController.verifyPayment
);

router.get("/ordered", userAuth.isLogin, userOrderController.loadOrdered);
router.get("/orders", userAuth.isLogin, userOrderController.loadOrders);
router.get(
  "/orders/summary",
  userAuth.isLogin,
  userOrderController.loadSummary
);
router.get("/orders/cancel", userAuth.isLogin, userOrderController.cancelOrder);
router.get(
  "/orders/cancelorder",
  userAuth.isLogin,
  userOrderController.cancelOrderPayment
);
router.get("/orders/return", userAuth.isLogin, userOrderController.returnOrder);

router.get("/wishlist", userAuth.isLogin, userWishlistController.loadWishlist);
router.get(
  "/wishlist/add",
  userAuth.isLogin,
  userWishlistController.addToWishlist
);
router.get(
  "/wishlist/rem",
  userAuth.isLogin,
  userWishlistController.removeFromWishlist
);

router.get("/coupon", userAuth.isLogin, userCouponController.loadCoupon);
router.get("/coupon/apply", userAuth.isLogin, userCouponController.applyCoupon);

router.get("/offer", userAuth.isLogin, userOfferController.loadOffer);
router.get('/offer/products',userAuth.isLogin, userOfferController.loadProOffer)
router.get("/wallet", userAuth.isLogin, userWalletController.loadWallet);

router.get(
  "/generateInvoice",
  userAuth.isLogin,
  userOrderController.generateInvoice
);

module.exports = router;
