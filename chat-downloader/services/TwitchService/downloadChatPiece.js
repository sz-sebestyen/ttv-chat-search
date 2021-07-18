const twitchApi = require("../../TwitchApi");
const ChatMessage = require("../../models/ChatMessage");

const SECONDS_IN_A_DAY = 24 * 3600;

const shouldRemoveFirstComment = (comments, startSeconds) => {
  const [firstComment] = comments;
  return firstComment.content_offset_seconds < startSeconds;
};

const shouldRemoveLastComment = (comments, endSeconds) => {
  const lastComment = comments[comments.length - 1];
  return lastComment.content_offset_seconds >= endSeconds;
};

const isNotLastPage = (page, endSeconds) =>
  !shouldRemoveLastComment(page.comments, endSeconds);

const saveComments = async (comments) => {
  comments.forEach((comment) => {
    delete comment._id;
    delete comment.commenter._id;
  });

  await ChatMessage.insertMany(comments);
};

module.exports = async (vodId, startSeconds, endSeconds) => {
  if (endSeconds > SECONDS_IN_A_DAY) {
    throw RangeError("chat piece exceeds 24 hours");
  }

  let currentPage = await twitchApi.getVodChatAtSeconds(vodId, startSeconds);

  while (shouldRemoveFirstComment(currentPage.comments, startSeconds)) {
    currentPage.comments.shift();
  }

  while (isNotLastPage(currentPage, endSeconds)) {
    const { _next, comments } = currentPage;

    saveComments(comments);

    currentPage = await twitchApi.getVodChatPageAtCursor(vodId, _next);
  }

  while (shouldRemoveLastComment(currentPage.comments, endSeconds)) {
    currentPage.comments.pop();
  }

  await saveComments(currentPage.comments);
};
