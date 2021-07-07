require("dotenv").config();
const fetch = require("node-fetch");

const client_id = process.env.TWITCH_CLIENT_ID;
const access_token = process.env.TWITCH_ACCESS_TOKEN;

const vod_id = 1078574122;
const url = `https://api.twitch.tv/helix/videos?id=${vod_id}`;

const getVodInfo = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${access_token}`,
      "client-id": client_id,
      // Accept: "application/vnd.twitchtv.v5+json; charset=UTF-8",
    },
  });
  // console.log("res: ", res);

  const data = await res.json();

  console.log("vod info: ", data);

  const fs = require("fs");
  fs.writeFileSync("vod_info.json", JSON.stringify(data));

  return data;
};

getVodInfo();
