const { searchMessages } = require("../services");

const searchInChat = async (req, res, next) => {
  const { id } = req.params;
  const { term } = req.query;

  if (!id) return res.status(400).json({ message: "Missing VOD id" });
  if (!term) return res.status(400).json({ message: "Missing search term" });

  const messages = await searchMessages(id, term);

  res.json(messages);
};

module.exports = searchInChat;
