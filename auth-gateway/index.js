const app = require("./app");

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");

  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
});
