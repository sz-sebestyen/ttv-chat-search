const express = require("express");
const app = express();

// controllers
const vodController = require("./controllers/vod");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod", vodController);

app.use((err, req, res, next) => {
  if (err) {
    console.log("server error: ", err);
    res.status(500).json({ message: "Internal server error" });
  } else {
    next();
  }
});

module.exports = app;
