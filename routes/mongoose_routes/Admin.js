const express=require("express");
const router=express.Router();
const mongooseController=require("../../contollers/mongoose_contollers/Admin");

router.get("/add",mongooseController.addProduct);
router.get("/allProduct",mongooseController.allProduct);
router.post("/addProductSubmit",mongooseController.handleAddProduct);
router.post("/updateProductPage",mongooseController.updateProduct);
router.use("/finishProductUpdate",mongooseController.finishUpdate);
router.post("/deleteProduct",mongooseController.deleteProduct);
// router.get("/showAllProduct",mongooseController.);

module.exports=router;