const { UserSearchHistory } = require("../models");

const getUserSearchHistory = async (req, res, next) => {
  const userId = req.headers["x-user_id"];

  const history = await UserSearchHistory.findOne({ userId });

  res.json(history.searches);
};

module.exports = getUserSearchHistory;
