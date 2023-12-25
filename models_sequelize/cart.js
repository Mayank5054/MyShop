const {Sequelize, DataTypes} = require("sequelize");
const seq=require("../utils/db_sequelize");

const cart=seq.define("Cart",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})

module.exports=cart;