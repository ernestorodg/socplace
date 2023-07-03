const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    createdAt: String,
    savedProducts: [{}],
    latitude: Number,
    longitude: Number,
    image: String
  }
);

module.exports = mongoose.model("User", UserSchema);