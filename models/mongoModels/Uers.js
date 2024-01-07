const mongodb=require("mongodb");
const { getDB }=require("../../utils/mongodb");
const Product = require("../mongoModels/Product");
class User{
    constructor(email,password,cart,id){
        this.email=email;
        this.password=password;
        this.cart=cart;
        this.id=id;
    }

    save(){
        const db=getDB();
        return db.collection("Users")
        .insertOne(this);
    }

    static findUser(userId){
        const db=getDB();
        return db.collection("Users")
        .findOne({_id:new mongodb.ObjectId(userId)})
    }

    static findByEmailAndPassword(email,password){
        const db=getDB();
        return db.collection("Users")
        .findOne({
            $and:[{email:email},{password:password}]
        });
    }
    addToCart(product){
        const db=getDB();
        const index=this.cart.items.findIndex(e => {
            console.log(e);
            return e.productID.toString() == product._id.toString()});
        var updatedItem = [...this.cart.items];
        console.log("updatedItem",updatedItem);
        if(index != -1){
            updatedItem[index].quantity=updatedItem[index].quantity + 1;
        }
        else{
         updatedItem.push({productID:product._id,quantity:1});
        }
    //    const  updatedItem= { items: [{
    //         ...product,
    //         quantity:5
    //     }]}
        console.log(updatedItem);
        console.log(this.id);
        db.collection("Users")
        .updateOne({
            _id:this.id
        },
        {
            $set:{cart:{
                items:updatedItem
            }}
        })
        .then(e=>{console.log(e);console.log("Added To Cart");})
        .catch(e => {console.log(e);})


    }
}


module.exports=User;