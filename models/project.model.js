const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  src: String,
  caption: String,
});

const projectSchema = new mongoose.Schema(
  {
    name: String,
    subtitle: String,
    country: String,
    year: String,
    desc: String,
    tags: [String],

    photos: [photoSchema], // 👈 MANY IMAGES HERE
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);