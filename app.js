const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const Admin = require("./routes/Admin");
const ProductView = require("./routes/Product");
const Error = require("./routes/ErrorRoute");
const root = require("./utils/path");
const path = require("path");
const Product=require("./models_sequelize/product");
const User=require("./models_sequelize/user");
const Cart=require('./models_sequelize/cart');
const CartItem=require('./models_sequelize/cartItem');
const Order=require("./models_sequelize/order");
const OrderItem=require("./models_sequelize/orderItem");
const sequqlize_routes=require("./routes/Sequelize_routes/Admin");

// const seq_model = require("./models/sequelize_product");
const seq = require("./utils/db_sequelize");
  
app.set("view engine", "ejs");
app.set("views", "views");
app.engine("ejs", require("ejs").__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "Public")));
  
app.use((req,res,next)=>{
User.findByPk(1).then(user =>{
    req.user=user;
    next();
}).catch(err =>{ console.log(err);});
});

app.use("/admin", Admin);
app.use("/Sequelize",sequqlize_routes);

app.use(ProductView);
app.use(Error);



// app.use((req,res,next)=>{
// count++;
// console.log("Hello World");
// res.setHeader("Content-Type","text/html");
// res.write("<h2>This is Main Route</h2>");
// res.write(`${count}`);
// res.end();
// })

const server = http.createServer(app);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});

seq.sync({force:true})
.then(e => {
    return User.findByPk(1)
})
.then(user =>{
    if(!user){
       return User.create({name:"Mayank",email:"mayanksheladiya49@gmail.com"})
    }
    return user;
})
.then(user =>{
    console.log(user)
    var fetchCart=null;
    user.getCart().then(cart=>{
        if(!cart){
         user.createCart().then(e=>{
            fetchCart=e;
            console.log("cart creatd");
         });
        }
        else{
            fetchCart=user.getCart();
        }
    })
    return fetchCart;
})
.then(user =>{
    console.log(user);
    server.listen(5354); 
})
.catch((e)=>{console.log(e);});
// seq.sync()
//     .then(
//         result => {
//             console.log(result);
//             seq_model.create({
//                 title: "mayank "
//             });
//             seq_model.findAll()
//             .then(
//                 e=>{
//                     console.log("data",e);
//                     console.log(e.length  );
//             });
//         })
//     .catch((e) => { console.log(e); })

