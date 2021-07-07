const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getVodLink = require("./getVodLink");

console.log(getVodLink(123123121123123, 60 * 60 * 24 + 123));
