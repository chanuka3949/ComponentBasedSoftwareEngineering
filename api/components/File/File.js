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
    required: true,
  },
  data: {
    data: Buffer,
  },
  contentType: {
    type: String,
    required: true,
  },
  referenceDocumentIdentifier: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
