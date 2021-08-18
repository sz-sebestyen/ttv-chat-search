const app = require("./app");

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");

  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
});
