var Product = require("../../models/mongooseModels/Product");

exports.addProduct = (req,res,next) =>{
    console.log("hello,world");
    res.render("./Mongoose_views/addProductForm.ejs");
}

exports.allProduct = (req,res,next) => {
    Product.find()
    .select()
    .populate("userId","name email -_id")
    .then(data => {
        console.log(data);
        res.render("./Mongoose_views/showAllProduct.ejs",
        {data:data});
        // console.log(data);
    })
}
exports.handleAddProduct = (req,res,next) =>{
const name=req.body.name;
const price=req.body.price;
console.log(name , price);
const product=new Product({
title:name,
price:price,
userId:req.user
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


exports.updateProduct = (req,res,next) => {
    Product.findById(req.body.id)
    .then(product => {
        console.log("updated",product);
       res.render("./Mongoose_views/updateProductTemp.ejs",{
        title:product.title,
        price:product.price,
        id:product._id,
       }) 
    })
}

exports.finishUpdate = (req,res,next) =>{
    console.log("finish UPdate called");
    // console.log(req.body.id);
    Product.findById(req.body.id)
    .then(product => {
        // console.log("product , ",product);
        console.log(req.body.title);
        console.log(req.body.price);
        product.title=req.body.title;
        product.price=req.body.price;
        // console.log(product);
        product.save()
        .then(result => {console.log("Product Updated");console.log(result);
        res.redirect("/mongoose/allProduct");
    })
        .catch(error => {console.log(error);})
    })
}

exports.deleteProduct = (req,res,next) =>{
    const id=req.body.id;
   
    Product.findByIdAndDelete(id)
    .then(
        result =>{
            console.log("product deleted");
            console.log(result);
            res.redirect("/mongoose/allProduct");
        }
    )
}

exports.addToCart = (req,res,next) =>{
    Product.findById(req.body.id)
    .then(product => {
        req.user.addProductIntoCart(product);
    })
}