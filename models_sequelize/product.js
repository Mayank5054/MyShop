const seq=require("../utils/db_sequelize");
const {Sequelize, DataTypes}=require("sequelize");

const product=seq.define(
    "Product",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:DataTypes.STRING,
        price:DataTypes.DOUBLE
    }
)

module.exports=product;