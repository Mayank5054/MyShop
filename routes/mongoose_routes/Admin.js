const express=require("express");
const router=express.Router();
const mongooseController=require("../../contollers/mongoose_contollers/Admin");
const isAuth = require("../../contollers/mongoose_contollers/Auth/isAuth");
const { check } =require("express-validator");
router.get("/add",isAuth,mongooseController.addProduct);
router.get("/allProduct",isAuth,mongooseController.allProduct);
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
router.post("/postLogin",
check("email").isEmail()
.withMessage("Email address is not valid !")
// .custom((value,{}) => {
//     if(value=="test@gmail.com"){
//         throw new Error("This Email Is forbidden");
//   }
//   return true; 
// })
,mongooseController.postLogin);
router.get("/signup",mongooseController.getSignup);
router.post("/postSignup",mongooseController.postSignup);
router.get("/logout",mongooseController.getLogout);
router.get("/reset",isAuth,mongooseController.getReset);
router.post("/postReset",isAuth,mongooseController.postReset);
router.get("/uploadImage",mongooseController.preImageForm);
router.post("/postImage",mongooseController.postImage);
router.get("/allImages",mongooseController.showImage);
// router.get("/showAllProduct",mongooseController.);

module.exports=router;