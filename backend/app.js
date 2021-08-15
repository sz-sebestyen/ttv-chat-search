const express = require("express");
require("express-async-errors");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const downloadChat = require("./controllers/downloadChat");
const getVodInfo = require("./controllers/getVodInfo");
const searchInChat = require("./controllers/searchInChat");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id/chat", downloadChat);
app.get("/vod/:id/chat", searchInChat);
app.get("/vod/:id", getVodInfo);

app.use(errorHandler);

module.exports = app;
