const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const { errorHandler, identifyUser } = require("./middlewares");
const {
  codeController,
  loginController,
  proxyController,
  authCheckController,
} = require("./controllers");

const setupSwaggerDocs = require("./setupSwaggerDocs");

app.use(cors({ credentials: true, origin: process.env.FRONTEND_HOST }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwaggerDocs(app);

app.use(identifyUser);

app.get("/login", loginController);
app.get("/auth-check", authCheckController);
app.post("/code", codeController);
app.all("/*", proxyController);

app.use(errorHandler);

module.exports = app;
