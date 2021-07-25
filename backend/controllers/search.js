const asyncHandler = require("express-async-handler");
const searchMessages = require("../services/searchMessages");

const search = async (req, res, next) => {
  const { term, id } = req.params;

  const messages = await searchMessages(id, term);

  res.json(messages);
};

module.exports = asyncHandler(search);
