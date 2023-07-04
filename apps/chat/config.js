require('dotenv').config()
module.exports = {
    MONGODB: process.env.MONGO_DB,
    SECRET_KEY: 'some very secret key'
};

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
  