const seq=require("../utils/db_sequelize");
const {Sequelize,DataTypes}=require("sequelize");

const user= seq.define('User',{
title:{
    type:DataTypes.STRING
},
id1:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
},

});

  module.exports=user;

