const asyncHandler = require("express-async-handler");
const searchMessages = require("../services/searchMessages");

const searchInChat = async (req, res, next) => {
  const { id } = req.params;
  const { search } = req.query;

  const messages = await searchMessages(id, search);

  res.json(messages);
};

module.exports = asyncHandler(searchInChat);
