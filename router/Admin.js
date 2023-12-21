const express=require("express");

const router=express.Router();

router.use("/add-product",(req,res,next)=>{
    res.send(`
    <form action="/admin/product" method="post">
    <input type="text" name="title">
    <input type="submit">
    </form>
    `);
})

router.use("/product",(req,res,next)=>{
    console.log(req.body);
    res.send("Product added");
})

module.exports=router;
