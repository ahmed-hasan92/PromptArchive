const mongoose = require("mongoose");
require("dotenv").config();
const mongooseConnectionString = process.env.MONGO;

const dataBaseConnection = async () => {
  try {
    mongoose.connect(mongooseConnectionString);
    console.log("Mongo DB Is Working");
  } catch (error) {
    console.log("Error with Mong Connection");
  }
};

module.exports = dataBaseConnection;
