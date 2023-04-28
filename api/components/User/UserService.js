const User = require("./User");
const express = require("express");
const router = express.Router();
const httpError = require("http-errors");

//Test Endpoint
router.get("/", async (req, res, next) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.params.username });

    if (!user) {
      res.send("User does not exist in the system")
    }
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      picture: req.body.picture,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
    });
    let user = await newUser.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.params.username });

    if (!user) {
      throw httpError(404, "User does not exist in the system");
    }
    if (typeof req.body.name === "undefined") {
      user.set({ address: req.body.address });
    } else {
      user.set({ address: req.body.address, name: req.body.name });
    }
    user = await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
