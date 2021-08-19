const NOT_FOUND = 404;

const vodInfoResponse = async (req, res, next) => {
  const { vodInfo } = res.locals;

  if (vodInfo) {
    res.json(vodInfo);
    next();
  } else {
    res.status(NOT_FOUND).json({ message: "vod not found" });
  }
};

module.exports = vodInfoResponse;
