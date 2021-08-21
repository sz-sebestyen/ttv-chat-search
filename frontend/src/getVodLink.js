import getTimestamp from "./getTimestamp";

const getVodLink = (vod_id, content_offset_seconds) => {
  return `https://www.twitch.tv/videos/${vod_id}?t=${getTimestamp(
    content_offset_seconds
  )}`;
};

export default getVodLink;
