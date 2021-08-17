const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
  const { JWT_SECRET } = process.env;

  console.log(req.headers.authorization, req.headers.Authorization);

  const match = (req.headers.authorization || "").match(
    /^Bearer\s(?<jwt>.+)$/i
  );

  if (!match) return next();

  try {
    const decoded = await jwt.verify(match.groups.jwt, JWT_SECRET);

    console.log("decoded", decoded);

    res.locals.userId = decoded?.sub;
  } catch (error) {}

  next();
};

module.exports = identifyUser;
