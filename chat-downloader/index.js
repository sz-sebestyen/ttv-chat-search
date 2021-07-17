require("dotenv").config();
require("./database/connect");
const app = require("./app");

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

// const VodInfo = require("./models/VodInfo");
// new VodInfo({
//   id: "1078574122",
//   stream_id: "42713213517",
//   user_id: "26301881",
//   user_login: "sodapoppin",
//   user_name: "sodapoppin",
//   title: "Random games and WoW  | www.sodapoppin.shop (Discount code: POOR)",
//   description: "",
//   created_at: "2021-07-06T18:46:18Z",
//   published_at: "2021-07-06T18:46:18Z",
//   url: "https://www.twitch.tv/videos/1078574122",
//   thumbnail_url:
//     "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/60ac8b9eab0e2316468a_sodapoppin_42713213517_1625597168//thumb/thumb0-%{width}x%{height}.jpg",
//   viewable: "public",
//   view_count: 381712,
//   language: "en",
//   type: "archive",
//   duration: "8h48m40s",
//   muted_segments: null,
// }).save();

// const getVodLink = require("./getVodLink");
// console.log(getVodLink(123123121123123, 60 * 60 * 24 + 123));

// const getSecondsFromDuration = require("./getSecondsFromDuration");
// console.log(getSecondsFromDuration("0h34m12s"));