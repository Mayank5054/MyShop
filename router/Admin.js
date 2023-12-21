const express=require("express");

const path=require("path");

const router=express.Router();

const root=require("../utils/path");
router.use("/add-product",(req,res,next)=>{
 res.sendFile(path.join(root,"views","add-product.html"));
})

router.use("/all-product",(req,res,next)=>{
    console.log(req.body);
    res.send(`<h1>${req.body.title}</h1>`);
})

router.use("/",(req,res,next)=>{
    res.sendFile(path.join(root,"views","shop.html"));
    });

module.exports=router;
