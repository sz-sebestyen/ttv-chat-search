const SUCCESS = 200;

class AppCredentials {
  constructor({ clientId, clientSecret, accessToken }) {
    this.getClientId = () => clientId;
    this.getClientSecret = () => clientSecret;
    this.getAccessToken = () => accessToken;

    this.refreshAccessToken = async () => {
      const query = [
        `client_id=${clientId}`,
        `client_secret=${clientSecret}`,
        "grant_type=client_credentials",
      ].join("&");

      const url = `https://id.twitch.tv/oauth2/token?${query}`;

      const res = await fetch(url, {
        method: "POST",
      });

      const { access_token } = await res.json();

      accessToken = access_token;
    };

    this.checkAccessTokenValidity = async () => {
      const url = `https://id.twitch.tv/oauth2/validate`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      return res.status === SUCCESS;
    };
  }
}

module.exports = { AppCredentials };
