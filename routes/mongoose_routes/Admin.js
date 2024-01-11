const express=require("express");
const router=express.Router();
const mongooseController=require("../../contollers/mongoose_contollers/Admin");

router.get("/add",mongooseController.addProduct);
router.get("/allProduct",mongooseController.allProduct);
router.post("/addProductSubmit",mongooseController.handleAddProduct);
router.post("/updateProductPage",mongooseController.updateProduct);
router.use("/finishProductUpdate",mongooseController.finishUpdate);
router.post("/deleteProduct",mongooseController.deleteProduct);
router.post("/addToCart",mongooseController.addToCart);
router.get("/cart",mongooseController.showCart);
router.post("/deleteCartItem",mongooseController.deleteCartItem);
router.get("/order",mongooseController.orders);
router.post("/placeOrder",mongooseController.placeOrder);
router.get("/login",mongooseController.getLogin);
router.post("/postLogin",mongooseController.postLogin);
router.get("/signup",mongooseController.getSignup);
router.post("/postSignup",mongooseController.postSignup);
router.get("/logout",mongooseController.getLogout);
// router.get("/showAllProduct",mongooseController.);

module.exports=router;