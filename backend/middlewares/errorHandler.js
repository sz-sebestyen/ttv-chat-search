module.exports = (err, req, res, next) => {
  if (err) {
    console.log("server error: ", err);
    res.status(500).json({ message: "Internal server error" });
  } else {
    next();
  }
};
