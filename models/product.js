var products=[];
const fs=require("fs");
const path=require("path");
const root=require("../utils/path");
var p1=path.join(root,"data","file.txt");
module.exports = class Product{
    
    constructor(t){
       
        this.title=t;
    }

    save(){
        products.push(this);
        fs.writeFile(p1,JSON.stringify(products),(err,data)=>{
        });
    }

    static fetchAll(CB){
        fs.readFile(p1,(err,data)=>{
            // console.log(JSON.parse(data));
            CB(JSON.parse(data));
            // return JSON.parse(data);
        });
    }
}