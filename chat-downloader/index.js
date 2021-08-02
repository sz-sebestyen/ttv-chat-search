require("./database/connect");
const app = require("./app");
const twitchApi = require("./TwitchApi");
const mongoose = require("mongoose");

const { PORT, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_ACCESS_TOKEN } =
  process.env;

twitchApi.setCredentials({
  clientId: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  accessToken: TWITCH_ACCESS_TOKEN,
});

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
