const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const downloadChat = require("./controllers/downloadChat");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id", downloadChat);

app.use(errorHandler);

module.exports = app;
