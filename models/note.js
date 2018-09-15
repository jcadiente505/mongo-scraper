var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the schema
var NoteSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  note: {
    type: String
  }
});

// Export the Note model
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note