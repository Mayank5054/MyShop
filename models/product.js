var products=[];
const fs=require("fs");
const path=require("path");
const root=require("../utils/path");
var p1=path.join(root,"data","file.txt");
const db=require("../utils/databaseConnection");
var id=0;
module.exports = class Product{
    
    constructor(t){
        this.title=t;
        this.id=id++;
    }

    save(){
        // products.push(this);
        // fs.writeFile(p1,JSON.stringify(products),(err,data)=>{
        // });
   return db.execute(
        "insert into products values(?,?)",
        [this.title,this.id]
        );

    }

    static fetchAll(){

        return db.execute("select * from products");
        // fs.readFile(p1,(err,data)=>{
        //     // console.log(JSON.parse(data));
        //     CB(JSON.parse(data));
        //     // return JSON.parse(data);
        // });
    }
}