const express = require("express");
require("express-async-errors");
const app = express();
const { errorHandler, saveUserSearchHistory } = require("./middlewares");

const {
  downloadChat,
  getVodInfo,
  searchInChat,
  getUserSearchHistory,
} = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id/chat", downloadChat);
app.post("/vod/:id/chat-search", [saveUserSearchHistory, searchInChat]);
app.get("/vod/:id", getVodInfo);
app.get("/search-history", getUserSearchHistory);

app.use(errorHandler);

module.exports = app;
