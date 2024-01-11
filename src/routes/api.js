const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const userController = require("../controllers/userController")
const authmiddleware = require("../middleware/authmiddleware")
const wishController = require("../controllers/wishController")
const cartController = require("../controllers/cartController")
const invoicesController = require("../controllers/invoicesController")
const featuresController = require("../controllers/featuresController")
const {productCreateReviewService} = require("../services/productListService");

router.get("/productBrandList",productController.productBrandList);
router.get("/productCategoryList",productController.productCategoryList);
router.get("/productSlider",productController.productSlider);
router.get("/productByCategoryList/:categoryID",productController.productByCategoryList);
router.get("/productByBrandList/:brandID",productController.productByBrandList);
router.get("/productRemarkList/:remark",productController.productRemarkList);
router.get("/productBySimilarList/:categoryID",productController.productBySimilerList);
router.get("/productByKeyWord/:keyword",productController.productByKeyWord);
router.get("/productDetails/:productID",productController.productDetails);
router.get("/productReviewList/:productID",productController.productReviewList);
router.post("/productListFilter",productController.productListFilter)

// user controllers

router.get("/otp/:email", userController.userOtp);
router.get("/otp-verify/:email/:otp",userController.userLoginVerify);
router.get("/logout",authmiddleware, userController.userLogout);
router.post("/create-profile",authmiddleware, userController.createProfile);
router.post("/update-profile",authmiddleware, userController.updateProfile);
router.get("/profile-read",authmiddleware, userController.readProfile);

// wish controller api

router.get("/wish-list" , authmiddleware, wishController.wishController);
router.post("/create-wish" , authmiddleware, wishController.saveWishController);
router.post("/remove-wish-list" , authmiddleware, wishController.removeWishController);

// cart

router.get("/cart", authmiddleware, cartController.cartList);
router.post("/create-cart", authmiddleware, cartController.createCartList);
router.delete("/remove-cart", authmiddleware, cartController.removeCartList);
router.post("/remove-cart", authmiddleware, cartController.removeCartList);
router.post("/update-cart/:cartID", authmiddleware,cartController.updateCartList);

// invoice & payment

router.get("/create-invoice", authmiddleware,invoicesController.crateInvoice )

router.post("/payment-fail/:trxID",invoicesController.paymentFailController );
router.post("/payment-cancel/:trxID",invoicesController.paymentCancelController );
router.post("/payment-ipn/:trxID",invoicesController.paymentIpnController );
router.post("/payment-successful/:trxID",invoicesController.paymentSuccessfulController );
router.get("/invoicelist", authmiddleware, invoicesController.invoiceListController);
router.get("/invoice-product-list/:invoiceID", authmiddleware, invoicesController.invoiceProductListController);

// feature

router.get("/feature-list",featuresController.featureListController)
router.post("/review-create",  authmiddleware, productController.productCreateReviewController)







module.exports = router

