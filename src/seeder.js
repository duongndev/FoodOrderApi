require("dotenv").config();


const connectDB = require("./config/database");

const users = require("./dataFaker");

const User = require("./model/userModel");

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
