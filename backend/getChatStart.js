require("dotenv").config();
const fetch = require("node-fetch");

const client_id = process.env.TWITCH_CLIENT_ID;
const access_token = process.env.TWITCH_ACCESS_TOKEN;

const video_start = 1000;
const vod_id = 1078574122;
const startUrl = `https://api.twitch.tv/v5/videos/${vod_id}/comments?content_offset_seconds=${video_start}`;

const getStartOfChat = async () => {
  const res = await fetch(startUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${access_token}`,
      "client-id": client_id,
      Accept: "application/vnd.twitchtv.v5+json; charset=UTF-8",
    },
  });
  // console.log("res: ", res);

  const data = await res.json();

  console.log(
    "response: ",
    data.comments.length,
    "first comment: ",
    data.comments[0],
    "next: ",
    data._next
  );

  const fs = require("fs");
  fs.writeFileSync("chat.json", JSON.stringify(data));

  return data;
};

getStartOfChat();
