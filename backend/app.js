const express = require("express");
require("express-async-errors");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const saveUserSearchHistory = require("./middlewares/saveUserSearchHistory");
const downloadChat = require("./controllers/downloadChat");
const getVodInfo = require("./controllers/getVodInfo");
const searchInChat = require("./controllers/searchInChat");
const getUserSearchHistory = require("./controllers/getUserSearchHistory");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id/chat", downloadChat);
app.post("/vod/:id/chat-search", [saveUserSearchHistory, searchInChat]);
app.get("/vod/:id", getVodInfo);
app.get("/search-history", getUserSearchHistory);

app.use(errorHandler);

module.exports = app;
