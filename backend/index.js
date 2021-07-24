require("dotenv").config();
const app = require("./app");
require("./database/connect");

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
