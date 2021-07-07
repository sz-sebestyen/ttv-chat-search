require("dotenv").config();
const fetch = require("node-fetch");

const client_id = process.env.TWITCH_CLIENT_ID;
const client_secret = process.env.TWITCH_CLIENT_SECRET;

const url = `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`;

const getAppToken = async () => {
  const res = await fetch(url, {
    method: "POST",
  });

  const data = await res.json();

  console.log("response: ", data);

  return data;
};

getAppToken();
