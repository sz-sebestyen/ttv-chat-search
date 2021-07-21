const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

module.exports = app;
