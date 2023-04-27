const mongoose = require("mongoose");

var Extension = {
  PDF: ".pfd",
  PNG: ".png",
  CSV: ".csv",
};

const fileSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    enum: Extension,
  },
});

const File = mongoose.model("File", userSchema);
module.exports = File;
