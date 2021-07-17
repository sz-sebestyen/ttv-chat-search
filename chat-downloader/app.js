const express = require("express");
const app = express();

// controllers
const vodController = require("./controllers/vod");

// app-wide middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/vod", vodController);

module.exports = app;
