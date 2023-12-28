const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
let _db;

const mongoConnectFunction = (callback) => {
    mongoClient
    .connect("mongodb+srv://Mayank5354:Mayank%2E5354@cluster0.yofgfpa.mongodb.net/myShop?retryWrites=true&w=majority")
        .then(client => {
            _db = client.db();
            callback();
            console.log("Connection created");
        })
        .catch(e => { 
            console.log(e); 
            console.log("connection error"); 
        });
}

const getDB = () => {
    if(_db){
        return _db;
    }
    throw 'No DB found';
}
exports.mongoConnectFunction = mongoConnectFunction;
exports.getDB=getDB;