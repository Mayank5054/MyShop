
const product = require("../../models_sequelize/product");
const Product=require("../../models_sequelize/product");
exports.addProduct = (req,res,next)=>{
res.render("./Sequelize_views/add_product_form.ejs");
 }


 exports.postProduct=(req,res,next)=>{
  product.create({
    title:req.body.title,
    price:req.body.price
  }).then((e)=>{
console.log("Data Added");
  })
  res.redirect("/Sequelize/showAllProduct");
 }

 exports.showAllProduct=(req,res,next)=>{
    res.render("./Sequelize_views/show_product.ejs");
 }