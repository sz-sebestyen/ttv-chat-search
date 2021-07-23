const asyncHandler = require("express-async-handler");
const TwitchService = require("../services/TwitchService");

const NOT_FOUND = 404;

const vod = async (req, res, next) => {
  const { id } = req.params;

  const vodInfo = await TwitchService.getVodInfo(id);

  if (vodInfo) {
    res.json({ message: "vod found" });

    TwitchService.downloadChat(vodInfo);
  } else {
    res.status(NOT_FOUND).json({ message: "vod not found" });
  }
};

module.exports = asyncHandler(vod);
