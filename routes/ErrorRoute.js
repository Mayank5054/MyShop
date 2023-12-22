const express=require("express");

const ErrorController=require("../contollers/ErrorContoller");
const router=express.Router();

router.use(ErrorController.error404);

module.exports=router;