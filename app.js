const express = require("express");
const  http=require("http");
const bodyParser=require("body-parser");
const app=express();
const Admin=require("./router/Admin");
const Error = require("./router/ErrorRoute");
app.use(bodyParser.urlencoded({extended:true}));


app.use("/admin",Admin);
app.use(Error);


// app.use((req,res,next)=>{
// count++;
// console.log("Hello World");
// res.setHeader("Content-Type","text/html");
// res.write("<h2>This is Main Route</h2>");
// res.write(`${count}`);
// res.end();
// })

const server=http.createServer(app);

server.listen(5354);