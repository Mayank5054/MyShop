const path = require("path");
const root = require("../utils/path");
const productModel = require("../models/product");
const db = require("../utils/databaseConnection");
const mongoProductModel=require("../models/mongoModels/Product");
exports.addProduct = (req, res, next) => {
    res.sendFile(path.join(root, "views", "add-product.html"));
};


exports.allProduct = (req, res, next) => {
    mongoProductModel.fetchAll()
    .then(
        data => {
            console.log(data);
            res.render("product.ejs",{
                data:data
            })
        }
    )
//     const data=productModel.fetchAll().then(
//         (e)=>{
// console.log(e);
// res.render("product.ejs",{
//     data:e[0]
// })
//         }
//     )

   
};

exports.productAdded = (req, res, next) => {
    // console.log("product Added Succesfully");
    console.log("Product added",req.user);
const product=new mongoProductModel(req.body.title,req.user.id);
product.save();
    // var pro = new productModel(req.body.title);
    // // pro.save();
    // pro.save()
    //     .then(
    //         () => {
    //             console.log("Data Added Successsfully")
    //             res.redirect("/admin/all-product");
    //             // res.render("product.ejs", {
    //             //     title: "Product1",
    //             //     id: 0,
    //             // });
    //         });

    // res.sendFile(path.join(root, "views", "productConfirm.html"));
}

exports.root = (req, res, next) => {
    console.log(req);
    res.sendFile(path.join(root, "views", "shop.html"));
};

exports.editProduct=(req,res,next)=>{
    const id=req.body.id;
    productModel.update(id);
}
