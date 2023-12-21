const  http=require("http");

const server=http.createServer((req,res)=>{
console.log("Request Recieved");
})

server.listen(5354);