const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const {
  TWITCH_CLIENT_ID,
  TWITCH_REDIRECT_URI,
  TWITCH_CLIENT_SECRET,
  JWT_SECRET,
} = process.env;

const codeController = async (req, res, next) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ message: "Missing code" });

  const query = [
    `client_id=${TWITCH_CLIENT_ID}`,
    `client_secret=${TWITCH_CLIENT_SECRET}`,
    `code=${code}`,
    `grant_type=authorization_code`,
    `redirect_uri=${TWITCH_REDIRECT_URI}`,
  ].join("&");

  const codeRes = await fetch(`https://id.twitch.tv/oauth2/token?${query}`, {
    method: "POST",
  });

  const { id_token } = await codeRes.json();

  // TODO: verify issuer

  if (!id_token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.decode(id_token);

  const { preferred_username, sub } = decoded;

  const token = jwt.sign({ preferred_username, sub }, JWT_SECRET, {
    expiresIn: 15 * 60,
  });

  res.json({ token });
};

module.exports = codeController;
