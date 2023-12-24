const {Sequelize, DataTypes}=require("sequelize");

const sequelize = new Sequelize(
    'myshop', 'Mayank', 'Mayank.5354', {
    host: 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  
  module.exports=sequelize;

