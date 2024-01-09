const Order = require("../../models/mongooseModels/Order");
const Product = require("../../models/mongooseModels/Product");
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
        req.user.addProductIntoCart(product).then(
            result => {console.log(result);
                res.redirect("/mongoose/cart");
                // res.render("./Mongoose_views/cart.ejs",{
                //     user:req.user.name,
                //     cart:req.user.cart.items
                // });
            }
        );
    })
}

exports.showCart = (req,res,next) => {
   req.user.populate("cart.items.productId")
   .then(result => {
    console.log(result.cart.items);
    res.render("./Mongoose_views/cart.ejs",{
        user:req.user.name,
        cart:result.cart.items
    });
   })
} 

exports.deleteCartItem = (req,res,next) => {
var product;
Product.findById(req.body.id)
.then(product => {
    product=product;
    console.log("req.user.cart",req.user.cart);
    const items = req.user.cart.items.filter(item => {
        console.log("item",item);
        return item.productId.toString() != product._id.toString();
    });
    console.log("items",items);
    req.user.cart.items=items;
    req.user.save().then(
        result => {
            res.redirect("/mongoose/cart");
            // console.log("cart updated");
            // console.log(result);
        }
    )
});
}

exports.placeOrder = (req,res,next) => {
    console.log("place order placed");
    var sum=0;
    req.user.populate("cart.items.productId")
    .then(result => {
        console.log("result" , result.cart.items);
        result.cart.items.forEach(item => {
            sum+=item.productId.price
        });
        const order = new Order({
            userId:req.user,
            items:req.user.cart.items,
            totalAmount:sum
        })
       return order.save()
    })
    .then(result => {
        console.log("Order Created Successfully");
        req.user.cart.items = [];
        return req.user.save();
    })
    .then(
        result => {
            res.redirect("/mongoose/order");
            console.log("cart updated sucessfully");

        }
    )
    
}

exports.orders = (req,res,next) => {
    console.log(req.user);
    Order.find({userId:req.user._id})
    .select("totalAmount")
    .populate("userId")
    .then(data => {
        if(data.length != 0) {
        const name=data[0].userId.name;
        console.log(data);
        res.render("./Mongoose_views/Order.ejs",{
            name:name,
            data:data
        });
    }
    else{
        console.log("No Orders");
    }
    })
}