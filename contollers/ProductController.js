const fs=require("fs");
const path=require("path");
const root=require("../utils/path");
const path1=path.join(root,"data","file.txt");
const Cart=require("../models/cart");
exports.getProductById=(req,res,next)=>{
    const id=req.params.id;
    // console.log(id);
    fs.readFile(path1,(err,data)=>{
console.log(data);
var data1 = JSON.parse(data);
console.log(typeof data1);
data1 = data1.filter(a=>a.id==id) ;
res.render("product.ejs",{
    title:data1[0].title,
    id:data[0].id
});
    });
}

exports.addToCart=(req,res,next)=>{
    var id=1;
    var price=5000;
    Cart.addProduct(id,price);
    console.log("cart created");
    // res.send("cart updated");
}

exports.editProduct=(req,res,next)=>{
const id=req.body.id;
console.log(id);
// res.send("All done Edit");
res.render("editForm.ejs",{
    id:id
});
}


exports.deleteProduct=(req,res,next)=>{
    const id=req.body.id;
console.log(id);
res.send("All done Delete");
}

exports.anon=(req,res,next)=>{
console.log(req.body);
}