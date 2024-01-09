const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    items:[{
        productId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Order",OrderSchema);