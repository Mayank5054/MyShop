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
const userMongoDB=require("./models/mongoModels/Uers");
const {mongoConnectFunction}=require("./utils/mongodb");
const mongooseDB = require("./utils/mongoosedb");
const mongooseRoutes=require("./routes/mongoose_routes/Admin");
const mongooseUser = require("./models/mongooseModels/User");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const csrf=require("csurf");
// const seq_model = require("./models/sequelize_product");
const seq = require("./utils/db_sequelize");
  const store=new mongoSession({
    uri:"mongodb+srv://Mayank5354:Mayank%2E5354@cluster0.yofgfpa.mongodb.net/myShopMongoose",
    collection:"sessions"
  })
  const csrfProtection = csrf();
app.set("view engine", "ejs");
app.set("views", "views");
app.engine("ejs", require("ejs").__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "Public")));
// app.use((req,res,next)=>{
// User.findByPk(1).then(user =>{
//     req.user=user;
//     next();
// }).catch(err =>{ console.log(err);});
// });

// same as above but for mongodb
app.use(session({
    secret:"Mayank.5354",
    resave:false,
    saveUninitialized:false,
    store:store
}));
app.use(csrfProtection);

app.use((req,res,next)=>{
    if(req.session.user){
        console.log(req.session);
        mongooseUser.findById(req.session.user._id)
        .then(user => {
            req.user=user;
            next();
        })
    }
    // res.setHeader("Set-Cookie","isLoggedIn=true;Max-Age=1");
    // req.isLoggedIn=true;
    // req.session.isLoggedIn=true;
    // userMongoDB.findByEmailAndPassword("mayanksheladiya49@gmail.com","Mayank.5354")
    // .then(user =>{
    //  console.log("User fetched sucessfully");
    //  console.log(user);
    // //  req.user= new userMongoDB(user.email,user.password,user.cart,user._id);
    // //  console.log("req.user",req.user);
    //  next();
    // });
    // mongooseUser.findById("659cfb4b5c68710d76819953")
    // .then(
    //     user => {
    //         req.user= user;
    //         req.session.user=user;
    //         console.log("session ",req.session);
    //         console.log("req.user " , req.user);
    //         next();
    //     }
    // )

})
app.use((req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})
app.use("/admin", Admin);
app.use("/Sequelize",sequqlize_routes);
app.use("/mongoose",mongooseRoutes);
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
    mongoConnectFunction(()=>{
        mongooseDB().then(
            result => {
                server.listen(5354);
            }
        )
    //    mongooseDB().then(
    //     (e)=>{
    //     const user = new mongooseUser({
    //         name:"Mayank",
    //         email:"mayanksheladiya49@gmail.com",
    //         cart:{
    //             items:[]
    //         }
    //     })
    //     user.save().then(result => {
    //         console.log("user created");
    //         server.listen(5354);
    //     })
    //     }
    //    )
    
    });
    console.log("server created");
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

