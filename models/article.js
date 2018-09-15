var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create schema
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  summary: String,
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Export the model
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article; 