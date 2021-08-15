const jwt = require("jsonwebtoken");

const identifyUser = (req, res, next) => {
  const { JWT_SECRET } = process.env;

  const match = (req.headers.authorization || "").match(
    /^Bearer\s(?<jwt>.+)$/i
  );

  if (!match) return next();

  jwt.verify(match.groups.jwt, JWT_SECRET, (err, decoded) => {
    if (!err) {
      res.locals.userId = decoded?.sub;
    }

    next();
  });
};

module.exports = identifyUser;
