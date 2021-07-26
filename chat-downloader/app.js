const express = require("express");
const app = express();

// controllers
const vodInfoResponse = require("./controllers/vodInfoResponse");

// middlewares
const downloadChat = require("./middlewares/downloadChat");
const getVodInfo = require("./middlewares/getVodInfo");
const errorHandler = require("./middlewares/errorHandler");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod/:id/chat", [getVodInfo, vodInfoResponse, downloadChat]);
app.get("/vod/:id", [getVodInfo, vodInfoResponse]);

app.use(errorHandler);

module.exports = app;
