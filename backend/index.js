const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionString = process.env.DB_CONNECTION;

mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// const getVodLink = require("./getVodLink");
// console.log(getVodLink(123123121123123, 60 * 60 * 24 + 123));

const getSecondsFromDuration = require("./getSecondsFromDuration");
console.log(getSecondsFromDuration("0h34m12s"));
