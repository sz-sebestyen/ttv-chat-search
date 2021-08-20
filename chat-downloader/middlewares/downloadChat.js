const TwitchService = require("../services/TwitchService");

const downloadChat = async (req, res, next) => {
  const { vodInfo } = res.locals;

  TwitchService.downloadChat(vodInfo);
};

module.exports = downloadChat;
