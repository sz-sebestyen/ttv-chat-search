const express = require("express");
require("express-async-errors");
const app = express();
const { errorHandler, saveUserSearchHistory } = require("./middlewares");
const {
  validateIdParam,
  validateTermQuery,
  validateUserIdHeader,
} = require("./middlewares/validators");

const {
  downloadChat,
  getVodInfo,
  searchInChat,
  getUserSearchHistory,
} = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id/chat", [validateIdParam, downloadChat]);
app.post("/vod/:id/chat-search", [
  validateIdParam,
  validateTermQuery,
  saveUserSearchHistory,
  searchInChat,
]);
app.get("/vod/:id", [validateIdParam, getVodInfo]);
app.get("/search-history", [validateUserIdHeader, getUserSearchHistory]);

app.use(errorHandler);

module.exports = app;
