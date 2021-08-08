const minutesInAnHour = 60;

const secondsInAMinute = 60;
const secondsInAnHour = secondsInAMinute * minutesInAnHour;

const getVodLink = (vod_id, content_offset_seconds) => {
  let secondsLeft = Math.floor(content_offset_seconds);

  const hours = Math.floor(secondsLeft / secondsInAnHour);
  secondsLeft -= hours * secondsInAnHour;

  const minutes = Math.floor(secondsLeft / secondsInAMinute);
  secondsLeft -= minutes * secondsInAMinute;

  return `https://www.twitch.tv/videos/${vod_id}?t=${hours}h${minutes}m${secondsLeft}s`;
};

module.exports = getVodLink;
