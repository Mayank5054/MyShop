

const Product=require("../../models_sequelize/product");
exports.addProduct = (req,res,next)=>{
res.render("./Sequelize_views/add_product_form.ejs");
 }


 exports.postProduct=(req,res,next)=>{
  Product.create({
    title:req.body.title,
    price:req.body.price
  }).then((e)=>{
console.log("Data Added");
res.redirect("/Sequelize/showAllProduct");
  })
  
 }

 exports.showAllProduct=(req,res,next)=>{
    Product.findAll()
    .then((e)=>{
        console.log(e);
        res.render("./Sequelize_views/show_product.ejs",{
            products:e
        });
    })
    .catch();
    
 }