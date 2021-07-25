const express = require("express");
const app = express();

const SERVER_ERROR = 500;

// controllers
const vodController = require("./controllers/vod");

// middlewares
const downloadChat = require("./middlewares/downloadChat");
const getVodInfo = require("./middlewares/getVodInfo");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod/:id/chat", [getVodInfo, vodController, downloadChat]);
app.get("/vod/:id", [getVodInfo, vodController]);

app.use((err, req, res, next) => {
  if (err) {
    console.log("server error: ", err);

    res.status(SERVER_ERROR).json({ message: "Internal server error" });
  } else {
    next();
  }
});

module.exports = app;
