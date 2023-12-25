const {Sequelize, DataTypes} = require("sequelize");
const seq=require("../utils/db_sequelize");

const cartItem = seq.define("cartItem",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
    },
    quantatiy:DataTypes.INTEGER
})
module.exports=cartItem;