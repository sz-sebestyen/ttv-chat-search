const asyncHandler = require("express-async-handler");
const TwitchService = require("../services/TwitchService");

const vod = async (req, res, next) => {
  const { id } = req.query;

  const vodInfo = await TwitchService.getVodInfo(id);

  if (vodInfo) {
    res.json({ message: "vod found" });

    TwitchService.downloadChat(vodInfo);
  } else {
    res.status(404).json({ message: "vod not found" });
  }
};

module.exports = asyncHandler(vod);
