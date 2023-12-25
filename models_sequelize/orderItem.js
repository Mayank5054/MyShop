
const seq=require("../utils/db_sequelize");
const { DataTypes } = require("sequelize");

const orderItem=seq.define("OrderItem",{
    id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    quantity:DataTypes.INTEGER
});

module.exports=orderItem;