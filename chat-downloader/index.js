require("dotenv").config();
require("./database/connect");
const app = require("./app");
const twitchApi = require("./TwitchApi");

twitchApi.setCredentials(
  process.env.TWITCH_CLIENT_ID,
  process.env.TWITCH_CLIENT_SECRET,
  process.env.TWITCH_ACCESS_TOKEN
);

const Test = require("./models/Test");

const findTest = async () => {
  const test = await Test.find({ comment: "can't touch this" });

  console.log("found: ", test);
};

findTest();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
