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
  düzenle: String
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
    res.sendFile(__dirname + "/elements-data-tables.html");
  }).sort({name: 1});



});

app.post('/contact', (req, res) => {


  const day = date.getDate();
  const dayString = date.getDateAsString();


  const contactFormInfo = new ContactFormTable({
    name: req.body.name1,
    phone: req.body.phone,
    email: req.body.email1,
    message: req.body.message1,
    düzenle: req.body.düzenle,
    currentDate: day,
    currentDateString: dayString

  });
  contactFormInfo.save();
  res.redirect("/");

});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

    ContactFormTable.findByIdAndRemove(checkedItemId, function(err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/data-table-view");
    });


});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
