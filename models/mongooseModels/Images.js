const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Images = Schema({
    url:{
        type:"String",
        required:"true"
    },
    userId:{
        type:Schema.ObjectId,
        ref:"Users"
    }
})

module.exports = mongoose.model("Image",Images);