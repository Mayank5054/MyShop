const {Sequelize,DataTypes}=require("sequelize");
const seq=require("../utils/db_sequelize");
const order=seq.define("Order",{
    id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey:true
    },
})


module.exports=order;