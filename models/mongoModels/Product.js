const getDB=require("../../utils/mongodb").getDB;
const mongodb= require("mongodb");
class Product{
    constructor(title,id){
        this.title=title;
        this.id=id ? new mongodb.ObjectId(id) : null;
    }
    save(){
        const db=getDB();
        db.collection("Products")
        .insertOne(this)
        .then((e)=>{console.log("product added");console.log(e);})
        .catch((e)=>{console.log(e);})
    }

    static fetchAll(){
        const db=getDB();
       return db.collection("Products")
        .find()
        .toArray()
        .then(data => {return data})
        .catch(error => { throw "new error" })
        ;
    }

    static update(prodId){
        const db=getDB();
        return db.collection("Products")
        .updateOne({_id:new mongodb.ObjectId(prodId)},{$set:{
            title:"Mayank5354"
        }})
        .then((result)=>{console.log("Ptoduct Updated");})
    }
    static delete(prodId){
        const db=getDB();
        return db.collection("Products")
        .deleteOne({_id:new mongodb.ObjectId(prodId)})
        .then((result)=>{console.log("Ptoduct deleted");})
    }

    static fetchParticular(prodId){
        const db=getDB();
        return db.collection("Products")
        .findOne({
                _id: new mongodb.ObjectId(prodId)
        }).then(product => {
            console.log(product);
            return product;
        })
    }
}

module.exports=Product;