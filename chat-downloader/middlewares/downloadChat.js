const asyncHandler = require("express-async-handler");
const TwitchService = require("../services/TwitchService");

const downloadChat = async (req, res, next) => {
  const { vodInfo } = req;

  TwitchService.downloadChat(vodInfo);
};

module.exports = asyncHandler(downloadChat);
