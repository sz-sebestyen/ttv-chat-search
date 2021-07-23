const fetch = require("node-fetch");
const { AppCredentials } = require("./AppCredentials");

class TwitchApi {
  setCredentials(credentials) {
    this.credentials = new AppCredentials(credentials);
  }

  async makeAuthorizedRequest(url, options) {
    let fetchPromise = fetch(url, options);

    const res = await fetchPromise;

    if (res.status === 401) {
      await this.credentials.refreshAccessToken();

      options.headers.authorization = `Bearer ${this.credentials.getAccessToken()}`;

      fetchPromise = fetch(url, options);
    }

    return fetchPromise;
  }

  async getVodInfo(vod_id) {
    const url = `https://api.twitch.tv/helix/videos?id=${vod_id}`;

    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.credentials.getAccessToken()}`,
        "client-id": this.credentials.getClientId(),
      },
    };

    const res = await this.makeAuthorizedRequest(url, options);

    const answer = await res.json();

    if (res.status === 200) {
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
        authorization: `Bearer ${this.credentials.getAccessToken()}`,
        "client-id": this.credentials.getClientId(),
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
}

module.exports = new TwitchApi();
