require("dotenv").config();
require("./database/connect");
const app = require("./app");
const twitchApi = require("./TwitchApi");

const { PORT, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_ACCESS_TOKEN } =
  process.env;

twitchApi.setCredentials(
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_ACCESS_TOKEN
);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
