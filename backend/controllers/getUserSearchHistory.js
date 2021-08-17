const UserSearchHistory = require("../models/UserSearchHistory");

const getUserSearchHistory = async (req, res, next) => {
  const userId = req.headers["x-user_id"];

  console.log(req.headers);

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const history = await UserSearchHistory.findOne({ userId });

  res.json(history.searches);
};

module.exports = getUserSearchHistory;
