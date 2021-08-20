const express = require("express");
require("express-async-errors");
const app = express();

const { vodInfoResponse } = require("./controllers");

const { downloadChat, getVodInfo, errorHandler } = require("./middlewares");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/vod/:id/chat", [getVodInfo, vodInfoResponse, downloadChat]);
app.get("/vod/:id", [getVodInfo, vodInfoResponse]);

app.use(errorHandler);

module.exports = app;
