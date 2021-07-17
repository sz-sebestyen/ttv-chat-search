const TwitchApi = require("./TwitchApi");
const VodInfo = require("../../models/VodInfo");

class TwitchService {
  static async getVodStatus(id) {
    const vodInfoInDatabase = await VodInfo.findOne({ id });

    if (vodInfoInDatabase?.chatStatus === "downloaded") {
      return vodInfoInDatabase;
    }

    const freshVodInfo = await TwitchApi.getVodInfo(id);

    if (freshVodInfo) {
      return new VodInfo(freshVodInfo).save();
    } else {
      return null;
    }
  }
}

module.exports = TwitchService;
