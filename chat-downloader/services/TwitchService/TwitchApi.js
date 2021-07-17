const fetch = require("node-fetch");

class TwitchApi {
  constructor() {
    this.client_id = process.env.TWITCH_CLIENT_ID;
    this.client_secret = process.env.TWITCH_CLIENT_SECRET;
    this.access_token = process.env.TWITCH_ACCESS_TOKEN;

    // console.log("client_id: ", this.client_id);
    // console.log("client_secret: ", this.client_secret);
    // console.log("access_token: ", this.access_token);
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

    // console.log("access_token updated: ");
    // console.log("client_id: ", this.client_id);
    // console.log("client_secret: ", this.client_secret);
    // console.log("access_token: ", this.access_token);
  }

  async makeAuthorizedRequest(url, options) {
    let res = await fetch(url, options);

    if (res.status === 401) {
      await this.updateAppAccessToken();

      options.headers.authorization = `Bearer ${this.access_token}`;

      res = await fetch(url, options);
    }

    return res;
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

    const page = await res.json();

    return page;
  }

  async getVodChatAtSeconds(vod_id, content_offset_seconds) {
    const url = `https://api.twitch.tv/v5/videos/${vod_id}/comments?content_offset_seconds=${content_offset_seconds}`;
    return await this.getVodChatPage(url);
  }

  async getVodChatPageAtCursor(vod_id, cursor) {
    const url = `https://api.twitch.tv/v5/videos/${vod_id}/comments?cursor=${cursor}`;
    return await this.getVodChatPage(url);
  }

  async getValidation(access_token) {
    const url = `https://id.twitch.tv/oauth2/validate`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    const data = await res.json();

    return data;
  }
}

const twitchApi = new TwitchApi();

module.exports = twitchApi;
