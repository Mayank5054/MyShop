const fs = require("fs");
const path = require("path");
const root = require("../utils/path");

const path1 = path.join(root, "data", "cart.json");
module.exports = class Cart {

    static addProduct(id,productPrice) {
        var cart = { products: [], totalPrice: 0 };
        fs.readFile(path1, (err, data) => {
            
            console.log(data);
            if (!err) {
                cart = JSON.parse(data);
            }
             var update;
            console.log(cart.products.filter(a => a.id == id));
            if (cart.products.filter(a => a.id == id).length != 0 ) {
                console.log("if executed");
                update = { ...cart.products.filter(a => a.id == id)[0] };
                update.qty = update.qty + 1;
                cart.products.filter(a=>a.id==id)[0].qty= cart.products.filter(a=>a.id==id)[0].qty+1;
                
            } 
            else {
                console.log("else executed");
                update = { id: id, qty: 1 };
            cart.products=[...cart.products,update] ;
            }
            cart.totalPrice=cart.totalPrice+productPrice; 
        });
        fs.writeFile(path1,JSON.stringify(cart),(err,data)=>{
            console.log("data added to cart");
        });
    }
}