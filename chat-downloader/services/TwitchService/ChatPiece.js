const twitchApi = require("../../TwitchApi");
const ChatMessage = require("../../models/ChatMessage");

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

const saveComments = (comments) => {
  rename_ids(comments);
  return ChatMessage.insertMany(comments);
};

const getCommentsAfterStart = (comments, startSeconds) =>
  comments.filter(
    ({ content_offset_seconds }) => content_offset_seconds >= startSeconds
  );

const getCommentsBeforeEnd = (comments, endSeconds) =>
  comments.filter(
    ({ content_offset_seconds }) => content_offset_seconds < endSeconds
  );

const calculateProgress = (current, start, end) =>
  (current - start) / (end - start);

const getFirstPage = async (vodId, startSeconds) => {
  const firstPage = await twitchApi.getVodChatAtSeconds(vodId, startSeconds);

  firstPage.comments = getCommentsAfterStart(firstPage.comments, startSeconds);

  if (!firstPage.comments.length) {
    throw Error("Chat not available");
  }

  return firstPage;
};

const getNextPage = (vodId, cursor) =>
  twitchApi.getVodChatPageAtCursor(vodId, cursor);

class ChatPiece {
  constructor(vodId, startSeconds, endSeconds) {
    let chatPage;

    this.getProgress = () => {
      if (!chatPage) return 0;

      return calculateProgress(
        chatPage.comments[chatPage.comments.length - 1].content_offset_seconds,
        startSeconds,
        endSeconds
      );
    };

    this.download = async () => {
      chatPage = await getFirstPage(vodId, startSeconds);

      while (isNotLastPage(chatPage, endSeconds)) {
        saveComments(chatPage.comments);

        chatPage = await getNextPage(vodId, chatPage._next);
      }

      chatPage.comments = getCommentsBeforeEnd(chatPage.comments, endSeconds);

      await saveComments(chatPage.comments);
    };
  }
}

module.exports = ChatPiece;
