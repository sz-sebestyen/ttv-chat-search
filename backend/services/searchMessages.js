const ChatMessage = require("../models/ChatMessage");

const searchMessages = async (vodId, searchTerm) => {
  return ChatMessage.find({
    content_id: vodId,
    "message.body": new RegExp(searchTerm),
  })
    .sort({ created_at: "asc" })
    .exec();
};

module.exports = searchMessages;
