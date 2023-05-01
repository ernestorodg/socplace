const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  savedProducts: [{}],
  latitude: Number,
  longitude: Number,
  image: String
});

module.exports = model('User', userSchema);
