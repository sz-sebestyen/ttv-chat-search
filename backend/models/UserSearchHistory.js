const { Schema, model } = require("mongoose");

const SearchSchema = new Schema(
  {
    vodId: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

const UserSearchHistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  searches: [SearchSchema],
});

UserSearchHistorySchema.index({
  userId: 1,
});

const UserSearchHistory = model("usersearchhistory", UserSearchHistorySchema);

module.exports = UserSearchHistory;
