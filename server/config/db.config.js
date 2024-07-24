const mongoose = require("mongoose");

const databaseDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db ga ulandi");
  } catch (error) {
    console.log("db dan xatolik" + error);
  }
};

module.exports = databaseDB;
