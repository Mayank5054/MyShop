const {Sequelize,DataTypes}=require("sequelize");
const seq=require("../utils/db_sequelize");

const user=seq.define("User",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:DataTypes.STRING,
    email:DataTypes.STRING
});

module.exports=user;