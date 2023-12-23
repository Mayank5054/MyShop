const express=require("express");

const path=require("path");

const root=require("../utils/path");

const router=express.Router();

const AdminContoller = require("../contollers/AdminController");


const ProductController = require("../contollers/ProductController");

router.use("/add-product",AdminContoller.addProduct);

router.use("/all-product",AdminContoller.allProduct);

router.use("/productAdded",AdminContoller.productAdded);

router.use("/home",AdminContoller.root);

router.get("/addToCart",ProductController.addToCart);
router.post("/editProduct",ProductController.editProduct);
router.post("/deleteProduct",ProductController.deleteProduct);
router.post("/anon",ProductController.anon);
module.exports=router;
