import getTimeStamp from "./getTimeStamp";

const getVodLink = (vod_id, content_offset_seconds) => {
  return `https://www.twitch.tv/videos/${vod_id}?t=${getTimeStamp(
    content_offset_seconds
  )}`;
};

export default getVodLink;
