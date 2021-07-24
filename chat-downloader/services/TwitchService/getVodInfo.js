const twitchApi = require("../../TwitchApi");
const VodInfo = require("../../models/VodInfo");

const isMissing = (vodInfo) => !vodInfo || vodInfo.chatStatus === "error";

const getFreshvodInfo = async (id) => {
  const freshVodInfo = await twitchApi.getVodInfo(id);

  return freshVodInfo && new VodInfo(freshVodInfo).save();
};

const getVodInfoFromDatabase = (id) => VodInfo.findOne({ id });

const getVodInfo = async (id) => {
  let vodInfo = await getVodInfoFromDatabase(id);

  if (isMissing(vodInfo)) {
    vodInfo = getFreshvodInfo(id);
  }

  return vodInfo;
};

module.exports = getVodInfo;
