const twitchApi = require("../../TwitchApi");
const ChatMessage = require("../../models/ChatMessage");

const SECONDS_IN_A_DAY = 24 * 3600;

const isNotLastPage = (page, endSeconds) => {
  const lastComment = page.comments[page.comments.length - 1];
  return lastComment.content_offset_seconds < endSeconds && page._next;
};

const remove_ids = (comments) => {
  comments.forEach((comment) => {
    delete comment._id;
    delete comment.commenter._id;
  });
};

const saveComments = async (comments) => {
  await ChatMessage.insertMany(comments);
};

const getNotEarlyComments = (comments, startSeconds) => {
  const isNotEarly = ({ content_offset_seconds }) =>
    content_offset_seconds >= startSeconds;

  return comments.filter(isNotEarly);
};

const getNotLateComments = (comments, endSeconds) => {
  const isNotLate = ({ content_offset_seconds }) =>
    content_offset_seconds < endSeconds;

  return comments.filter(isNotLate);
};

module.exports = async (vodId, startSeconds, endSeconds) => {
  const isTooLong = endSeconds > SECONDS_IN_A_DAY;

  if (isTooLong) {
    throw RangeError("chat piece exceeds 24 hours");
  }

  let chatPage = await twitchApi.getVodChatAtSeconds(vodId, startSeconds);

  chatPage.comments = getNotEarlyComments(chatPage.comments, startSeconds);

  while (isNotLastPage(chatPage, endSeconds)) {
    remove_ids(chatPage.comments);
    saveComments(chatPage.comments);

    chatPage = await twitchApi.getVodChatPageAtCursor(vodId, chatPage._next);
  }

  chatPage.comments = getNotLateComments(chatPage.comments, endSeconds);

  remove_ids(chatPage.comments);
  await saveComments(chatPage.comments);
};
