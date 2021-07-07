require("dotenv").config();
const fetch = require("node-fetch");

const access_token = process.env.TWITCH_ACCESS_TOKEN;

const url = `https://id.twitch.tv/oauth2/validate`;

const getValidation = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  // console.log("res: ", res);

  const data = await res.json();

  console.log("response: ", data);

  return data;
};

getValidation();
