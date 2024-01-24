const Order = require("../../models/mongooseModels/Order");
const Product = require("../../models/mongooseModels/Product");
const User=require("../../models/mongooseModels/User");
const Image = require("../../models/mongooseModels/Images");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
console.log("req.user" , req.user);
product.save()
.then( result =>{
    console.log("result",result);
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
        user:req.user.email,
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
        const email=data[0].userId.email;
        console.log(data);
        console.log("order data",data);
        res.render("./Mongoose_views/Order.ejs",{
            name:email,
            data:data
        });
    }
    else{
        console.log("No Orders");
    }
    })
}


exports.getLogin = (req,res,next) => {
    res.render("./Mongoose_views/login.ejs");
}

exports.postLogin = (req,res,next) => {
const email=req.body.email;
const password=req.body.password;
const error= validationResult(req);
console.log("validation result" , error);
console.log(email,password);
User.findOne({email:email})
.then(user => {
    console.log(user);
    if(user){
        bcrypt.compare(password,user.password)
        .then(result => {
            if(result){
                req.session.user=user;
                req.session.isLoggedIn=true;
                console.log(user);
                req.session.save(err => {
                    User.findById(user._id)
                    .then(
                        user =>{
                            req.user=user;
                            console.log(req.user);
                            console.log("session saved");
                            res.redirect("/mongoose/add");
                        }
                    )
                   
                })
                console.log("authentication success");
            }
            else{
                console.log("password mismatched");
            }
            
        })
    }
    else{
        console.log("no user found");
    }
})
.catch(err => {console.log(err);})

}
exports.getSignup = (req,res,next) => {
    res.render("./Mongoose_views/signup.ejs");
}

exports.postSignup = (req,res,next) => {
 const email = req.body.email;
 const password=req.body.password;
 bcrypt.hash(password,12)
 .then(password => {
  User.findOne({email:email})
 .then(result => {
    if(result){
        console.log("user already exists");
        res.redirect("/mongoose/login");
    }
    else {
        const user = new User({
            email:email,
            password:password,
            cart:{items:[]}
         })
        user.save().then(
            result => {
                console.log(result);
                console.log("User created successfully");
                res.redirect("/mongoose/login");
            }
         )
    }
 })
 })
 
 
 
}

exports.getLogout = (req,res,next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/mongoose/login");
    })
    
}


exports.getReset = (req,res,next) => {
    res.render("./Mongoose_views/reset.ejs",{

    });
}

exports.postReset = (req,res,next) => {
    console.log("/post reset started");
    console.log(req.session.user);
    const password=req.body.newPassword;
    User.findById(req.session.user._id)
    .then(user => {
        bcrypt.hash(password,12)
        .then(newPass => {
            user.password=newPass;
            return user.save();
        })
        .then(result => {
            console.log("user password changed");
        })
    })
}


exports.preImageForm = (req,res,next) => {
res.render("./Mongoose_views/uploadImageForm.ejs");
}

exports.postImage = (req,res,next) => {
console.log("image upload added");
console.log("req.file = " ,req.file);
const image = new Image({
url:req.file.filename,
userId:req.session.user
})

image.save().then(result => {
    console.log("image added");
})
}

exports.showImage = (req,res,next) => {
      
    Image.find().then(
        result => {
            console.log(result);
            res.render("./Mongoose_views/showAllImages.ejs",{
                data:result
            })
        }
    )
}