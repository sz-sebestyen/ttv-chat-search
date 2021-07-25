const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const downloadChat = require("./controllers/downloadChat");
const getVodInfo = require("./controllers/getVodInfo");
const search = require("./controllers/search");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id/chat", downloadChat);
app.get("/vod/:id", getVodInfo);
app.get("/vod/:id/search/:term", search);

app.use(errorHandler);

module.exports = app;
