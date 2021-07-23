const twitchApi = require("../../TwitchApi");
const ChatMessage = require("../../models/ChatMessage");

const HOURS_IN_A_DAY = 24;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_DAY = HOURS_IN_A_DAY * SECONDS_IN_AN_HOUR;

const isNotLastPage = (page, endSeconds) => {
  const lastComment = page.comments[page.comments.length - 1];
  return lastComment.content_offset_seconds < endSeconds && page._next;
};

const rename_ids = (comments) => {
  comments.forEach((comment) => {
    comment.original_id = comment._id;
    comment.commenter.original_id = comment.commenter._id;
    delete comment._id;
    delete comment.commenter._id;
  });
};

const saveComments = async (comments) => {
  await ChatMessage.insertMany(comments);
};

const getNotEarlyComments = (comments, startSeconds) => {
  const isNotEarlyComment = ({ content_offset_seconds }) =>
    content_offset_seconds >= startSeconds;

  return comments.filter(isNotEarlyComment);
};

const getNotLateComments = (comments, endSeconds) => {
  const isNotLateComment = ({ content_offset_seconds }) =>
    content_offset_seconds < endSeconds;

  return comments.filter(isNotLateComment);
};

module.exports = async (vodId, startSeconds, endSeconds) => {
  const isTooLong = endSeconds > SECONDS_IN_A_DAY;

  if (isTooLong) {
    throw RangeError("chat piece exceeds 24 hours");
  }

  let chatPage = await twitchApi.getVodChatAtSeconds(vodId, startSeconds);

  chatPage.comments = getNotEarlyComments(chatPage.comments, startSeconds);

  while (isNotLastPage(chatPage, endSeconds)) {
    rename_ids(chatPage.comments);
    saveComments(chatPage.comments);

    chatPage = await twitchApi.getVodChatPageAtCursor(vodId, chatPage._next);
  }

  chatPage.comments = getNotLateComments(chatPage.comments, endSeconds);

  rename_ids(chatPage.comments);
  await saveComments(chatPage.comments);
};
