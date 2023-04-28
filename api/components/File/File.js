const mongoose = require("mongoose");

var Extension = {
  PDF: ".pdf",
  PNG: ".png",
  JPG: ".jpg",
  JPEG: ".jpeg",
};

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  data: {
    data: Buffer,
  },
  contentType: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    enum: Extension,
    required: false,
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
