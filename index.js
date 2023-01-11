const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + '/date.js');
const app = express();

app.set('view engine', 'ejs');


app.use(express.urlencoded({
  extended: false
}));

app.use("/content", express.static("content"));
app.use("/images", express.static("images"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));


mongoose.connect("mongodb://localhost:27017/MyHeraklesDB", {
  useNewUrlParser: true
});

mongoose.set('strictQuery', false);

const contactFormSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  currentDate: Date,
  currentDateString: String,
  reformdate: Date
});

const ContactFormTable = mongoose.model("ContactFormTable", contactFormSchema);


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/manage-contact-informations", function(req, res) {
  res.sendFile(__dirname + "/quadra-index.html");
});

app.get("/data-table-view", function(req, res) {

  ContactFormTable.find({}, function(err, foundContactList) {
    console.log(foundContactList);
    res.render("data-tables", {
      contactList: foundContactList
    });
  }).sort({name: 1});



});

app.post('/contact', (req, res) => {


  const day = date.getDate();
  const dayString = date.getDateAsString();


  const contactFormInfo = new ContactFormTable({
    _id: ObecjtId,
    name: req.body.name1,
    phone: req.body.phone,
    email: req.body.email1,
    message: req.body.message1,
    reformdate: req.body.reformdate,
    currentDate: day,
    currentDateString: dayString

  });
  contactFormInfo.save();
  res.redirect("/");

});

app.post("/update", function(req, res) {

  const reformdate = req.body.reformdate;
  const customerName= req.body.name;


  console.log(req.body);
  console.log(customerName);

  ContactFormTable.findOneAndUpdate({_id: req.body.dataBaseId}, { $set: { reformdate: reformdate }}, function(err, foundContactList){
    console.log(foundContactList);
    console.log("update");
  })
res.redirect("/data-table-view");
    /*const contactReform = ContactFormTable.find({reformdate}, function(err, foundContactList) {
      //console.log(contactReform);
      res.render("data-tables", {
        contactList: foundContactList
      });
      res.sendFile(__dirname + "/elements-data-tables.html");
    }).sort({name: 1});*/



});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
