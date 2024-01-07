const mongoose=require("mongoose");

const mongooseDB= () => {
    return mongoose
    .connect("mongodb+srv://Mayank5354:Mayank%2E5354@cluster0.yofgfpa.mongodb.net/myShopMongoose?retryWrites=true&w=majority");
}


module.exports=mongooseDB;