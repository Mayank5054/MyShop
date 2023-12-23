const mysql=require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Mayank',
    password: 'Mayank.5354',
    database: 'myShop'
  });
  
  connection.execute("truncate table products");
module.exports=connection.promise();