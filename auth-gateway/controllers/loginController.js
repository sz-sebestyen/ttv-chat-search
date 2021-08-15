const { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } = process.env;

const query = [
  `client_id=${TWITCH_CLIENT_ID}`,
  `redirect_uri=${TWITCH_REDIRECT_URI}`,
  `response_type=code`,
  `scope=openid`,
].join("&");

const twitchOAuthUrl = `https://id.twitch.tv/oauth2/authorize?${query}`;

const loginController = async (req, res, next) => {
  res.redirect(twitchOAuthUrl);
};

module.exports = loginController;
