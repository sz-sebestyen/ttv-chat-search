const twitchApi = require("../TwitchApi");
const VodInfo = require("../models/VodInfo");

const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;

const DURATION_REGEX = /^(\d+)h(\d+)m(\d+)s$/;

class TwitchService {
  static getSecondsFromDuration(duration) {
    const match = duration.match(DURATION_REGEX);

    if (!match) {
      throw TypeError("Invalid duration");
    }

    const [, hours, minutes, seconds] = match;

    return hours * SECONDS_IN_AN_HOUR + minutes * SECONDS_IN_A_MINUTE + seconds;
  }

  static async getVodStatus(id) {
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
  }

  static async getChat(id) {
    const vodInfo = await VodInfo.findOne({ id });

    const vodLengthInSeconds = TwitchService.getSecondsFromDuration(
      vodInfo.duration
    );

    // first just console.log the first page of the vod's chat

    const firstPage = await twitchApi.getVodChatAtSeconds(id, 0);

    console.log("firstPage: ", firstPage);
  }
}

module.exports = TwitchService;
