const file = require("./File");
const express = require("express");
const router = express.Router();
const httpError = require("http-errors");
const fs = require("fs");
var multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
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

const upload = multer({
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

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    console.log(req.body.identifier);
    let obj = {
      title: req.body.title,
      contentType: req.file.mimetype,
      referenceDocumentIdentifier: req.body.identifier,
      data: {
        data: fs.readFileSync(
          path.join(__dirname + "/../../uploads/" + req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
    };
    await file.create(obj);
    res.send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
