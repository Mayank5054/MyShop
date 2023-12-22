const path=require("path");
const root=require("../utils/path");

exports.addProduct=(req,res,next)=>{
    res.sendFile(path.join(root,"views","add-product.html"));
   };


exports.allProduct=(req,res,next)=>{
    console.log(req.body);
    res.send(`<h1>${req.body.title}</h1>`);
};

exports.root=(req,res,next)=>{
    res.sendFile(path.join(root,"views","shop.html"));
    };