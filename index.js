const fs = require("node:fs");
const express = require ("express");
const bodyParser = require ("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use("/content", express.static("content"));
app.use("/images", express.static("images"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));










app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

console.log(__dirname);

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
