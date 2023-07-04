require('dotenv').config()
module.exports = {
  MONGODB: process.env.MONGO_DB,
  SECRET_KEY: 'some very secret key'
};
