const Article = require("../models/article");
const Note = require("../models/note");
const axios = require("axios");
const cheerio = require("cheerio");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
var exports = (module.exports = {});

exports.scraper = (req, res) => {
    // AXIOS get request to liquor.com news article section
    axios.get("https://www.liquor.com/discover/#gs.NjJIXmk").then(response => {
        // Load the Liquor.com HTML into cheerio
        const $ = cheerio.load(response.data);

        // Loop through each article card
        $("div.card").each((i, element) => {
            // assign each piece of html we want too a variable
            let headline = $(element).find("div.copy").children("h3").text();
            let summary = $(element).find("div.copy").children("div.archive-item-text").text();
            let url = $(element).find("div.image").children("a.overlay").attr("href");

            // console.log("Headline: " + headline);
            // console.log("Summary: " + summary);
            // console.log("URL: " + url);

            Article.collection.insert({
                headline: headline,
                summary: summary,
                url: url,
                saved: false
            }, (err, inserted) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("scrape complete");
                }
            });
        });
        
        res.render("index");
    });
}

exports.allArticles = (req, res) => {
    Article.collection.find({}).toArray((error, found) => {
        if (error) {
            console.log(" =============THIS IS ERROR===================" + error);
        }
        else {
            res.send(found);
        }
    })
}

exports.oneArticle = (req, res) => {
    Article.collection.findOneAndUpdate(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        {
            $set: {
                saved: true
            }
        },
        (error, found) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            else {
                console.log(found);
                res.send(found);
            }
        }
    );
}

exports.addNote = (req, res) => {
    console.log(req.body);

        Note.collection.insert(req.body, (error, saved) => {
            if (error) {
                console.log(error);
            }
            else {
                res.send(saved);
            }
        });
}

exports.allNotes = (req, res) => {
    Note.collection.find({}, (error, found) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(found);
        }
    });
}

exports.oneNote = (req, res) => {
    Note.collection.findOne(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        (error, found) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            else {
                console.log(found);
                res.send(found);
            }
        }
    );
}

exports.updateNote = (req, res) => {
    Note.collection.update(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        {
            $set: {
                title: req.body.title,
                note: req.body.note,
                modified: Date.now()
            }
        },
        (error, edited) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            else {
                res.send(edited);
            };
        }
    );
}

exports.deleteNote = (req, res) => {
    Note.collection.remove(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        (error, removed) => {
            if (error) {
                console.log(error);
                res.send(error)
            }
            else {
                console.log(removed);
                res.send(removed);
            };
        }
    );
}

exports.deleteAll = (req, res) => {
    Note.collection.remove({}, (error, response) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(response);
            res.send(response);
        }
    });
}

exports.savedArticles = (req, res) => {
    Article.collection.find({
        saved: true
    }, (error, found) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log(found);
            res.render("saved", found);
        }
    })
}