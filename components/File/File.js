const mongoose = require("mongoose");

var Extension = {
  PDF: ".pfd",
  PNG: ".png",
  CSV: ".csv",
};

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  data : {
    type: Buffer,
    required:true
  },
  extension: {
    type: String,
    enum: Extension,
    required: false
  },
  contentType: {
    type: String,
    requred: true
  }
});

const File = mongoose.model("File", userSchema);
module.exports = File;
