const express = require("express");
require("express-async-errors");
const app = express();
const { errorHandler, saveUserSearchHistory } = require("./middlewares");
const {
  validateTermQuery,
  validateUserIdHeader,
} = require("./middlewares/validators");

const {
  downloadChat,
  getVodInfo,
  searchInChat,
  getUserSearchHistory,
} = require("./controllers");

const setupSwaggerDocs = require("./setupSwaggerDocs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwaggerDocs(app);

app.post("/vod/:id/chat", downloadChat);
app.post("/vod/:id/chat-search", [
  validateTermQuery,
  saveUserSearchHistory,
  searchInChat,
]);
app.get("/vod/:id", getVodInfo);
app.get("/search-history", [validateUserIdHeader, getUserSearchHistory]);

app.use(errorHandler);

module.exports = app;
