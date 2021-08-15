const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const { CLIENT_ID, REDIRECT_URI, CLIENT_SECRET, JWT_SECRET } = process.env;

const codeController = async (req, res, next) => {
  const { code } = req.query;

  console.log("code:", code);

  const query = [
    `code=${code}`,
    `client_id=${CLIENT_ID}`,
    `client_secret=${CLIENT_SECRET}`,
    `scope=openid%20email`,
    `redirect_uri=${REDIRECT_URI}`,
    `grant_type=authorization_code`,
  ].join("&");

  const googleUrl = `https://oauth2.googleapis.com/token?${query}`;

  const response = await fetch(googleUrl, {
    method: "POST",
  });

  const json = await response.json();

  console.log("tokens:", json);

  const decoded = jwt.decode(json.id_token);

  console.log("decoded:", decoded);

  const token = jwt.sign({ sub: decoded.sub }, JWT_SECRET);

  res.json({ token });
};

module.exports = codeController;
