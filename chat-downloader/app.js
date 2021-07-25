const express = require("express");
const app = express();

// controllers
const vodController = require("./controllers/vod");

// middlewares
const downloadChat = require("./middlewares/downloadChat");
const getVodInfo = require("./middlewares/getVodInfo");
const errorHandler = require("./middlewares/errorHandler");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod/:id/chat", [getVodInfo, vodController, downloadChat]);
app.get("/vod/:id", [getVodInfo, vodController]);

app.use(errorHandler);

module.exports = app;
