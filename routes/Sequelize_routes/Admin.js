const express=require("express");
const router=express.Router();
const AdminContoller=require("../../contollers/Sequelize_Controllers/AdminContoller");
const { route } = require("../Admin");

router.use("/main",(req,res,next)=>{
    res.render("./Sequelize_views/nav.ejs");
})

router.get("/addProduct",AdminContoller.addProduct);

router.post("/handleAddProduct",AdminContoller.postProduct);

router.get("/showAllProduct",AdminContoller.showAllProduct);
router.get("/products",AdminContoller.products);
router.get("/getCart",AdminContoller.getCart);
router.post("/addToCart",AdminContoller.addToCart);
router.post("/placeOrder",AdminContoller.placeOrder);
module.exports=router;