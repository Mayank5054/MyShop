//  if we ommit ./ here then it is serach module globally otherwise 
// on the local 
const http=require("http");


const server=http.createServer((req,res)=>{
    console.log(req);
});

server.listen(5354);