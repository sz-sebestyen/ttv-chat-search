const fetch = require("node-fetch");

class TwitchApi {
  setCredentials(client_id, client_secret, access_token) {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_ACCESS_TOKEN } =
      process.env;

    this.client_id = client_id || TWITCH_CLIENT_ID;
    this.client_secret = client_secret || TWITCH_CLIENT_SECRET;
    this.access_token = access_token || TWITCH_ACCESS_TOKEN;
  }

  async updateAppAccessToken() {
    const query = [
      `client_id=${this.client_id}`,
      `client_secret=${this.client_secret}`,
      "grant_type=client_credentials",
    ].join("&");

    const url = `https://id.twitch.tv/oauth2/token?${query}`;

    const res = await fetch(url, {
      method: "POST",
    });

    const { access_token } = await res.json();

    this.access_token = access_token;
  }

  async makeAuthorizedRequest(url, options) {
    let fetchPromise = fetch(url, options);

    let res = await fetchPromise;

    if (res.status === 401) {
      await this.updateAppAccessToken();

      options.headers.authorization = `Bearer ${this.access_token}`;

      fetchPromise = fetch(url, options);
    }

    return fetchPromise;
  }

  async getVodInfo(vod_id) {
    const url = `https://api.twitch.tv/helix/videos?id=${vod_id}`;

    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.access_token}`,
        "client-id": this.client_id,
      },
    };

    const res = await this.makeAuthorizedRequest(url, options);

    console.log(res);

    const answer = await res.json();

    if (res.status === 200) {
      console.log("ttv answer: ", answer);

      const {
        data: [vodInfo],
      } = answer;

      return vodInfo;
    } else {
      return null;
    }
  }

  async getVodChatPage(url) {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.access_token}`,
        "client-id": this.client_id,
        Accept: "application/vnd.twitchtv.v5+json; charset=UTF-8",
      },
    };

    const res = await this.makeAuthorizedRequest(url, options);

    return res.json();
  }

  async getVodChatAtSeconds(vod_id, content_offset_seconds) {
    const url = `https://api.twitch.tv/v5/videos/${vod_id}/comments?content_offset_seconds=${content_offset_seconds}`;
    return this.getVodChatPage(url);
  }

  async getVodChatPageAtCursor(vod_id, cursor) {
    const url = `https://api.twitch.tv/v5/videos/${vod_id}/comments?cursor=${cursor}`;
    return this.getVodChatPage(url);
  }

  async getValidation(access_token) {
    const url = `https://id.twitch.tv/oauth2/validate`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    return res.json();
  }
}

module.exports = new TwitchApi();
