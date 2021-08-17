const UserSearchHistory = require("../models/UserSearchHistory");

const saveUserSearchHistory = async (req, res, next) => {
  const userId = req.headers["x-user_id"];
  const { id } = req.params;
  const { term } = req.query;

  const newSearch = { vodId: id, term };

  if (userId) {
    try {
      const doc = await UserSearchHistory.updateOne(
        { userId },
        { $push: { searches: newSearch } },
        { new: true, upsert: true }
      );
    } catch (error) {
      console.log(erorr);
    }
  }

  next();
};

module.exports = saveUserSearchHistory;
