const Product = require("../../models/mongooseModels/Product");

exports.addProduct = (req,res,next) =>{
    console.log("hello,world");
    res.render("./Mongoose_views/addProductForm.ejs");

}


exports.handleAddProduct = (req,res,next) =>{
const name=req.body.name;
const price=req.body.price;
console.log(name , price);

const product=new Product({
title:name,
price:price
});


product.save()
.then( result =>{
    Product.find()
    .then(data => {
        res.render("./Mongoose_views/showAllProduct.ejs",
        {data:data});
        // console.log(data);
    })
    .catch(e =>{ console.log(e);})
    // console.log("data added");
})

}