const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    posts: [{ title: String, text: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
