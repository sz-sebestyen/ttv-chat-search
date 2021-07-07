const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// require("dotenv").config();
// const fetch = require("node-fetch");

// const client_id = process.env.TWITCH_CLIENT_ID;
// const access_token = process.env.TWITCH_ACCESS_TOKEN;

// const vod_id = 1078574122;
// const next =
//   "eyJpZCI6IjgyNTQ2Yzc5LTkyYTItNDk1MS04YWQ5LWU2YzA0MjVhMGJkMiIsImhrIjoiYnJvYWRjYXN0OjQyNzEzMjEzNTE3Iiwic2siOiJBQUFBNjVnMkpjQVdqMGp4Q0lDUXdBIn0f";
// const nextUrl = `https://api.twitch.tv/v5/videos/${vod_id}/comments?cursor=${next}`;

// const getNextChatPage = async () => {
//   const res = await fetch(nextUrl, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${access_token}`,
//       "client-id": client_id,
//       Accept: "application/vnd.twitchtv.v5+json; charset=UTF-8",
//     },
//   });
//   // console.log("res: ", res);

//   const data = await res.json();

//   console.log(
//     "response: ",
//     data.comments.length,
//     "first comment: ",
//     data.comments[0],
//     "next: ",
//     data._next
//   );

//   return data;
// };

// getNextChatPage();
