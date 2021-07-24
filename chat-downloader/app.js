const express = require("express");
const app = express();

const SERVER_ERROR = 500;

// controllers
const vodController = require("./controllers/vod");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod/:id", vodController);

app.use((err, req, res, next) => {
  if (err) {
    console.log("server error: ", err);

    res.status(SERVER_ERROR).json({ message: "Internal server error" });
  } else {
    next();
  }
});

module.exports = app;
