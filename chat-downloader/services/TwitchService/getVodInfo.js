const twitchApi = require("../../TwitchApi");
const { VodInfo } = require("../../models");

const isMissing = (vodInfo) => !vodInfo || vodInfo.chatStatus === "error";

const getFreshVodInfo = async (id) => {
  const freshVodInfo = await twitchApi.getVodInfo(id);

  return freshVodInfo && new VodInfo(freshVodInfo).save();
};

const getVodInfoFromDatabase = (id) => VodInfo.findOne({ id });

const getVodInfo = async (id) => {
  let vodInfo = await getVodInfoFromDatabase(id);

  if (isMissing(vodInfo)) {
    vodInfo = getFreshVodInfo(id);
  }

  return vodInfo;
};

module.exports = getVodInfo;
