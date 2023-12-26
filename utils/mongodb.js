const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;


const  mongoConnectFunction = (callback) => {
    mongoClient.connect("mongodb+srv://Mayank5354:Mayank%2E5354@cluster0.yofgfpa.mongodb.net/?retryWrites=true&w=majority")
    .then(client=>{
        console.log("Connection Created");
        callback(client);
})
    .catch(e=>{console.log(e);console.log("connection error");});
}

module.exports=mongoConnectFunction;