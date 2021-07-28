const TwitchService = require("../services/TwitchService");

const getVodInfo = async (req, res, next) => {
  const { id } = req.params;

  req.vodInfo = await TwitchService.getVodInfo(id);

  next();
};

module.exports = getVodInfo;
