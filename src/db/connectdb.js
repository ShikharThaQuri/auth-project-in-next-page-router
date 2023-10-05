const mongoose = require("mongoose");

// require("dotenv").config();

const SECRET_KEY = process.env.DB_STRING;

const connectdb = async () => {
  return mongoose.connect(SECRET_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectdb;
