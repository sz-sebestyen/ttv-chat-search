const SERVER_ERROR = 500;

module.exports = (err, req, res, next) => {
  if (err) {
    console.log("server error: ", err);
    res.status(SERVER_ERROR).json({ message: "Internal server error" });
  } else {
    next();
  }
};
