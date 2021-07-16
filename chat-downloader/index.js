const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
require("../shared-nodejs/database/connect")(mongoose);

const Test = require("./models/Test");

const findTest = async () => {
  const test = await Test.find({ comment: "can't touch this" });

  console.log("found: ", test);
};

findTest();
