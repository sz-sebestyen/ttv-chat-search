const twitchApi = require("../../TwitchApi");
const VodInfo = require("../../models/VodInfo");

module.exports = async (id) => {
  const vodInfoInDatabase = await VodInfo.findOne({ id });

  if (vodInfoInDatabase?.chatStatus === "downloaded") {
    return vodInfoInDatabase;
  }

  const freshVodInfo = await twitchApi.getVodInfo(id);

  if (freshVodInfo) {
    return new VodInfo(freshVodInfo).save();
  } else {
    return null;
  }
};
