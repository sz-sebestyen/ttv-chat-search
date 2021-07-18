const twitchApi = require("../TwitchApi");
const VodInfo = require("../models/VodInfo");
const ChatMessage = require("../models/ChatMessage");

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

  static async downloadChat(vodId) {
    const vodInfo = await VodInfo.findOne({ id: vodId });

    const vodLengthInSeconds = TwitchService.getSecondsFromDuration(
      vodInfo.duration
    );

    TwitchService.downloadChatPiece(vodId, 0, 15);
  }

  static async downloadChatPiece(vodId, startSeconds, endSeconds) {
    if (endSeconds > 24 * 60 * 60) {
      throw RangeError("chat piece exceeds 24 hours");
    }

    let currentPage = await twitchApi.getVodChatAtSeconds(vodId, startSeconds);

    const shouldRemoveLastComment = (comments) => {
      const lastComment = comments[comments.length - 1];
      return lastComment.content_offset_seconds >= endSeconds;
    };

    const isNotLastPage = (page) => !shouldRemoveLastComment(page.comments);

    const saveComments = (comments) => {
      comments.forEach((comment) => {
        delete comment._id;
        delete comment.commenter._id;
      });

      ChatMessage.insertMany(comments, (error, docs) => {
        if (error) throw error;
      });
    };

    while (isNotLastPage(currentPage)) {
      const { _next, comments } = currentPage;

      saveComments(comments);

      currentPage = await twitchApi.getVodChatPageAtCursor(vodId, _next);
    }

    while (shouldRemoveLastComment(currentPage.comments)) {
      currentPage.comments.pop();
    }

    saveComments(currentPage.comments);
  }
}

module.exports = TwitchService;
