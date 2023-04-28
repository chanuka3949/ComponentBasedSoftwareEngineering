const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: null },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: false,
  },
  address: {
    type: addressSchema,
    requred: false,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
