const validateTermQuery = (req, res, next) => {
  const { term } = req.query;

  if (!term)
    return res.status(400).json({ message: "Missing term in url search" });

  next();
};

module.exports = validateTermQuery;
