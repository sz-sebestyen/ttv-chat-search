const express = require("express");
require("express-async-errors");
const app = express();

// controllers
const { vodInfoResponse } = require("./controllers");

// middlewares
const { downloadChat, getVodInfo, errorHandler } = require("./middlewares");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod/:id/chat", [getVodInfo, vodInfoResponse, downloadChat]);
app.get("/vod/:id", [getVodInfo, vodInfoResponse]);

app.use(errorHandler);

module.exports = app;
