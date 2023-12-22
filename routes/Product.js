const express=require("express")

const router=express.Router();

const ProductController=require("../contollers/ProductController");

router.get("/product/:id",ProductController.getProductById);

module.exports=router;