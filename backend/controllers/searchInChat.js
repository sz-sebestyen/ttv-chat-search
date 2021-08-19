const { searchMessages } = require("../services");

const searchInChat = async (req, res, next) => {
  const { id } = req.params;
  const { term } = req.query;

  const messages = await searchMessages(id, term);

  res.json(messages);
};

module.exports = searchInChat;
