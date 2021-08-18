const authCheckController = async (req, res, next) => {
  const { userId } = res.locals;

  if (userId) {
    res.json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authCheckController;
