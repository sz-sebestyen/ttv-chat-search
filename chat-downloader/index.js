require("dotenv").config();
require("./database/connect");
const app = require("./app");
const twitchApi = require("./TwitchApi");

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
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
