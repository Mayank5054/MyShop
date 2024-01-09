const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items:[{
            productId:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }]
    }
})

userSchema.methods.addProductIntoCart = function(product){
    const findIndex = this.cart.items.findIndex(e => {return e.productId.toString() === product._id.toString()});
    if(findIndex >=0 ){
        this.cart.items[findIndex].quantity = this.cart.items[findIndex].quantity + 1;
        return this.save();
        };
    
    this.cart.items.push({
        productId:product._id,
        quantity:1
    });
    return this.save().then();
}
module.exports = mongoose.model("Users",userSchema);
