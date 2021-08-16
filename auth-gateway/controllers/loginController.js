const { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } = process.env;

const loginController = async (req, res, next) => {
  const { state } = req.query;

  const query = [
    `client_id=${TWITCH_CLIENT_ID}`,
    `redirect_uri=${TWITCH_REDIRECT_URI}`,
    `response_type=code`,
    `scope=openid`,
    `state=${state}`,
  ].join("&");

  const twitchOAuthUrl = `https://id.twitch.tv/oauth2/authorize?${query}`;

  res.redirect(twitchOAuthUrl);
};

module.exports = loginController;
