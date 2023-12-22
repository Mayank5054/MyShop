const express=require("express");

const path=require("path");

const root=require("../utils/path");

const router=express.Router();

const AdminContoller = require("../contollers/AdminController");

router.use("/add-product",AdminContoller.addProduct);

router.use("/all-product",AdminContoller.allProduct);

router.use("/",AdminContoller.root);

module.exports=router;
