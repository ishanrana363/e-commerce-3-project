const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const userController = require("../controllers/userController")
const authmiddleware = require("../middleware/authmiddleware")
const wishController = require("../controllers/wishController")

router.get("/productCategoryList",productController.productCategoryList);
router.get("/productBrandList",productController.productBrandList);
router.get("/productSlider",productController.productSlider);
router.get("/productByCategoryList/:categoryID",productController.productByCategoryList);
router.get("/productByBrandList/:brandID",productController.productByBrandList);
router.get("/productRemarkList/:remark",productController.productRemarkList);
router.get("/productBySimilerList/:categoryID",productController.productBySimilerList);
router.get("/productByKeyWord/:keyword",productController.productByKeyWord);
router.get("/productDetails/:productID",productController.productDetails);
router.get("/productReviewList/:productID",productController.productReviewList);

// user controllers

router.get("/otp/:email", userController.userOtp);
router.get("/otp-verify/:email/:otp",userController.userLoginVerify);
router.get("/logout",authmiddleware, userController.userLogout);
router.post("/create-profile",authmiddleware, userController.createProfile);
router.post("/update-profile",authmiddleware, userController.updateProfile);
router.get("/profile-read",authmiddleware, userController.readProfile);

// wish controller api

router.post("/wish-list" , authmiddleware, wishController.wishController);
router.post("/create-wish" , authmiddleware, wishController.saveWishController);
router.post("/remove-wish-list" , authmiddleware, wishController.removeWishController);


module.exports = router

