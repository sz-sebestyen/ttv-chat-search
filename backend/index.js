const app = require("./app");
require("./database/connect");
const mongoose = require("mongoose");

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");

  server.close(() => {
    console.log("Http server closed.");

    // boolean means [force]
    mongoose.connection.close(false, () => {
      console.log("MongoDb connection closed.");
      process.exit(0);
    });
  });
});
