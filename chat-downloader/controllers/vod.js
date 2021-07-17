const asyncHandler = require("express-async-handler");
const TwitchService = require("../services/TwitchService");

const vod = async (req, res, next) => {
  const { id } = req.query;

  const vodStatus = await TwitchService.getVodStatus(id);

  if (vodStatus) {
    res.json({ message: "OK" });

    // TODO: start downloading chat
  } else {
    res.status(404).json({ message: "vod not found" });
  }
};

module.exports = asyncHandler(vod);
