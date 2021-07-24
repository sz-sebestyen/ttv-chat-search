const asyncHandler = require("express-async-handler");

const NOT_FOUND = 404;

const vodController = async (req, res, next) => {
  const { vodInfo } = req;

  if (vodInfo) {
    res.json({ message: "OK" });
    next();
  } else {
    res.status(NOT_FOUND).json({ message: "vod not found" });
  }
};

module.exports = asyncHandler(vodController);
