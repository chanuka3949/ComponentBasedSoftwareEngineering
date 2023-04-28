const file = require("./File");
const express = require("express");
const router = express.Router();
const httpError = require("http-errors");
const fs = require('fs');
var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, "uploads");
    console.log(file)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf" && ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("File type not supported"));
    }
    callback(null, true);
  },
  limits: {
    //Maximum size set to 16MB
    fileSize: 1024 * 1024 * 16,
  },
});

router.get("/", async (req, res, next) => {
  file.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.send();
  });
});

router.post("/", upload.single('file'), async (req, res, next) => {
  var obj = {
    title: req.body.title,
    contentType: req.file.mimetype,
    data: {
      data: fs.readFileSync(
        path.join(__dirname + "/../../uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  };
  file.create(obj).then((err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.send();
    }
  });
});

module.exports = router;
