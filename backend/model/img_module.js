// const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   filename: String,
//   filePath: String,
// });
// const Image = mongoose.model("Image", imageSchema);

// module.exports = Image;

const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

const Image = mongoose.model("ImageDetails", ImageDetailsScehma);
module.exports = Image;
