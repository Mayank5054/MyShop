const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const Admin = require("./routes/Admin");
const ProductView = require("./routes/Product");
const Error = require("./routes/ErrorRoute");
const root = require("./utils/path");
const path = require("path");
const seq_model = require("./models/sequelize_product");
const seq = require("./utils/db_sequelize");

app.set("view engine", "ejs");
app.set("views", "views");
app.engine("ejs", require("ejs").__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "Public")));
app.use("/admin", Admin);
app.use(ProductView);
app.use(Error);


// app.use((req,res,next)=>{
// count++;
// console.log("Hello World");
// res.setHeader("Content-Type","text/html");
// res.write("<h2>This is Main Route</h2>");
// res.write(`${count}`);
// res.end();
// })

const server = http.createServer(app);

seq.sync()
    .then(
        result => {
            console.log(result);
            seq_model.create({
                title: "mayank "
            });
            seq_model.findAll()
            .then(
                e=>{
                    console.log("data",e);
                    console.log(e.length  );
            });
        })
    .catch((e) => { console.log(e); })

server.listen(5354, () => {
    console.log("server created");
}); 