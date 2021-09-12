const jwt = require("jsonwebtoken");

const getBearerToken = (authorizationHeader = "") =>
  authorizationHeader.match(/^Bearer\s(?<jwt>.+)$/i);

const identifyUser = async (req, res, next) => {
  const { JWT_SECRET } = process.env;

  const token = getBearerToken(req.headers.authorization);

  if (!token) return next();

  jwt.verify(token.groups.jwt, JWT_SECRET, (err, decoded) => {
    res.locals.userId = decoded?.sub;
    next();
  });
};

module.exports = identifyUser;
