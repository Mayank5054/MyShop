const express=require("express");
const router=express.Router();
const mongooseController=require("../../contollers/mongoose_contollers/Admin");

router.get("/add",mongooseController.addProduct);
router.post("/addProductSubmit",mongooseController.handleAddProduct);
// router.get("/showAllProduct",mongooseController.);

module.exports=router;