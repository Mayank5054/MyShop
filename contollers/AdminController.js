const path=require("path");
const root=require("../utils/path");
const productModel=require("../models/product");
exports.addProduct=(req,res,next)=>{
    res.sendFile(path.join(root,"views","add-product.html"));
   };


exports.allProduct=(req,res,next)=>{
    const data = productModel.fetchAll(
        (data)=>{
console.log(data);
        }
    );
    // console.log(data);
    res.send(`<h1>data consoled !</h1>`);
};

exports.productAdded=(req,res,next)=>{
    console.log("product Added Succesfully");
    var pro=new productModel(req.body.title);
    pro.save();
    res.sendFile(path.join(root,"views","productConfirm.html"));
}
exports.root=(req,res,next)=>{
    res.sendFile(path.join(root,"views","shop.html"));
    };

