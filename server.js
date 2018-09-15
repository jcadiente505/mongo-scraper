const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const mongojs = require("mongojs");

const axios = require("axios");
const cheerio = require("cheerio");

const Note = require("./models/note");
const Article = require("./models/article");

const PORT = process.env.PORT || 3000

const app = express();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// ===================== MIDDLE WARE ================= //

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require("./routes/routes")(app);

app.listen(PORT, function() {
  console.log("App running on port http://localhost:" + PORT + "!");
});