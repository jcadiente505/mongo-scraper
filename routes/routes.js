const Article = require("../models/article");
const Note = require("../models/note");
const axios = require("axios");
const cheerio = require("cheerio");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const controller = require("../controllers/article-cont");

module.exports = app => {

    app.get("/", controller.scraper);

    app.get("/saved/articles", controller.savedArticles);

    app.put("/save/article/:id", controller.oneArticle)

    app.get("/all/articles", controller.allArticles);
    
    app.get("/save/articles/:id", controller.oneArticle);
    
    app.post("/submit", controller.addNote);

    app.get("/all/notes", controller.allNotes);

    app.get("/find/notes/:id", controller.oneNote);

    app.put("./update/:id", controller.updateNote);

    app.get("/delete/:id", controller.deleteNote);

    app.get("/clearall", controller.deleteAll);
}