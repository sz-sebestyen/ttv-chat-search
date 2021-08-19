const validateUserIdHeader = (req, res, next) => {
  const userId = req.headers["x-user_id"];

  if (!userId)
    return res.status(401).json({ message: "Missing x-user_id in header" });

  next();
};

module.exports = validateUserIdHeader;
