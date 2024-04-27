const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: String,
  imageUrl: String,
});

const IMG = mongoose.model("IMG", imageSchema);

module.exports = IMG;
