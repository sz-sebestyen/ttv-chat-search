const twitchApi = require("../TwitchApi");
const VodInfo = require("../models/VodInfo");
const ChatMessage = require("../models/ChatMessage");

const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_DAY = 24 * 3600;

const DURATION_REGEX = /^(\d+)h(\d+)m(\d+)s$/;

const NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES = 4;

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

    const getChatSections = (numberOfSections, end) => {
      const partLength = Math.floor(end / numberOfSections);

      const parts = Array(numberOfSections)
        .fill()
        .map((_, index) => ({
          start: index * partLength,
          end: (index + 1) * partLength,
        }));

      parts.push({
        start: parts[parts.length - 1].end,
        end,
      });
      return parts;
    };

    const chatSections = getChatSections(
      NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES,
      15 // vodLengthInSeconds when I set up a local DB
    );

    const downloadProcesses = chatSections.map((chatSection) =>
      TwitchService.downloadChatPiece(vodId, chatSection.start, chatSection.end)
    );

    await Promise.all(downloadProcesses);

    // TODO: update VOD request in DB
    console.log("chat download finished");
  }

  static async downloadChatPiece(vodId, startSeconds, endSeconds) {
    if (endSeconds > SECONDS_IN_A_DAY) {
      throw RangeError("chat piece exceeds 24 hours");
    }

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

    const shouldRemoveFirstComment = (comments) => {
      const [firstComment] = comments;
      return firstComment.content_offset_seconds < startSeconds;
    };

    let currentPage = await twitchApi.getVodChatAtSeconds(vodId, startSeconds);

    while (shouldRemoveFirstComment(currentPage.comments)) {
      currentPage.comments.shift();
    }

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
