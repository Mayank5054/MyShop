
const Product = require("../../models_sequelize/product");

exports.addProduct = (req, res, next) => {
  res.render("./Sequelize_views/add_product_form.ejs");
}


exports.postProduct = (req, res, next) => {
  req.user.createProduct({
    title: req.body.title,
    price: req.body.price,
  }).then(e => {
    res.redirect("/Sequelize/showAllProduct")
  });
  //   Product.create({
  //     title:req.body.title,
  //     price:req.body.price,
  //     UserId:req.user.id
  //   }).then((e)=>{
  // console.log("Data Added");
  // res.redirect("/Sequelize/showAllProduct");
  //   })

}

exports.showAllProduct = (req, res, next) => {
  req.user.getProducts()
    .then(e => {
      res.render("./Sequelize_views/show_product.ejs", {
        products: e
      });
    });
  // Product.findAll()
  // .then((e)=>{
  //     console.log(e);
  //     res.render("./Sequelize_views/show_product.ejs",{
  //         products:e
  //     });
  // })
  // .catch();
}

exports.products = (req, res, next) => {
  req.user.getProducts()
    .then(e => {
      res.render("./Sequelize_views/showProducts.ejs", {
        products: e
      });
    });
  //   Product.findAll()
  //   .then((e)=>{
  //       console.log(e);
  //       res.render("./Sequelize_views/showProducts.ejs",{
  //           products:e
  //       });
  //   })
  //   .catch();
}


exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(e => {
      console.log("cart",e);
      e.getProducts().then(
        data=>{
          console.log(data);
          res.render("./Sequelize_views/Cart.ejs",{
            products:data
          });
        }
      )
      console.log(e);
    });
}


exports.addToCart = (req, res, next) => {
  var id = req.body.id;
  var fetchCart = null;
  console.log("id", id);
  req.user.getCart()
    .then(cart => {
      fetchCart = cart;
      console.log(cart);
      return cart.getProducts({ where: { id: id } });
    })
    .then(products => {
      console.log("cart products", products);
      var product = null;
      if (products.length > 0) {
        product = products[0];
        console.log(product);
      }
      if (product) {
        fetchCart.addProduct(product, {
          through: {
            quantatiy: product.cartItem.quantatiy + 1
          }
        }).then(e => {
          console.log("cart updated");
          fetchCart.getProducts().then(data => {
            console.log(data);
            res.render("./Sequelize_views/Cart.ejs",{
              products:data
            });
          })
        }
        );
      }
      else {
        Product.findByPk(id).then(
          product => {
            console.log("Products", product);
            fetchCart.addProduct(product, {
              through: {
                quantatiy: 1
              }
            }
            )
              .then(e => {
                console.log("else executed")
                fetchCart.getProducts().then(data => {
                  console.log(data);
                  res.render("./Sequelize_views/Cart.ejs",{
                    products:data
                  });
                }

                )

              });
          }
        );
      }

    })

}


exports.placeOrder=(req,res,next)=>{
  req.user.getCart()
  .then(cart =>{
    return cart.getProducts();
  })
  .then(products =>{
    req.user.createOrder()
    .then(order =>{
      return order.addProducts(
        products.map((product)=>{
          product.orderItem = {quantity:product.cartItem.quantatiy};
          return product;
        })
        );
    })
    .then(result =>{console.log("Order placed");
    req.user.getCart().then(cart =>{
      cart.setProducts(null);
    })
    req.user.getOrders({
      include:['Products']
    })
    .then(orders =>{
      console.log(orders);
      res.render("./Sequelize_views/viewOrder.ejs",{
        content:orders
      });})
    })
   
  })
  
}

