const asyncHandler = require("express-async-handler");
const TwitchService = require("../services/TwitchService");

const vod = async (req, res, next) => {
  const { id } = req.query;

  const vodStatus = await TwitchService.getVodStatus(id);

  if (vodStatus) {
    res.json({ message: "vod found" });

    TwitchService.getChat(id);
  } else {
    res.status(404).json({ message: "vod not found" });
  }
};

module.exports = asyncHandler(vod);
