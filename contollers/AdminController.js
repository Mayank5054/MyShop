const path = require("path");
const root = require("../utils/path");
const productModel = require("../models/product");
const db = require("../utils/databaseConnection");
exports.addProduct = (req, res, next) => {
    res.sendFile(path.join(root, "views", "add-product.html"));


};


exports.allProduct = (req, res, next) => {
    const data=productModel.fetchAll().then(
        (e)=>{
console.log(e);
res.render("product.ejs",{
    data:e[0]
})
        }
    )
    // const data = productModel.fetchAll(
    //     (data) => {
    //         console.log(data);
    //     }
    // );
    // console.log(data);
    // res.send(`<h1>data consoled !</h1>`);
};

exports.productAdded = (req, res, next) => {
    // console.log("product Added Succesfully");
    var pro = new productModel(req.body.title);
    // pro.save();
    pro.save()
        .then(
            () => {
                console.log("Data Added Successsfully")
                res.redirect("/admin/all-product");
                // res.render("product.ejs", {
                //     title: "Product1",
                //     id: 0,
                // });
            });

    // res.sendFile(path.join(root, "views", "productConfirm.html"));
}

exports.root = (req, res, next) => {
    res.sendFile(path.join(root, "views", "shop.html"));
};



