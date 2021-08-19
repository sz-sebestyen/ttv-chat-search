const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Missing id in url params" });

  next();
};

module.exports = validateIdParam;
