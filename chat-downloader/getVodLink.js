const minutesInAnHour = 60;
const hoursInADay = 24;

const secondsInAMinute = 60;
const secondsInAnHour = secondsInAMinute * minutesInAnHour;
const secondsInADay = secondsInAnHour * hoursInADay;

module.exports = (vod_id, content_offset_seconds) => {
  let secondsLeft = Math.floor(content_offset_seconds);

  const days = Math.floor(secondsLeft / secondsInADay);
  secondsLeft -= days * secondsInADay;

  const hours = Math.floor(secondsLeft / secondsInAnHour);
  secondsLeft -= hours * secondsInAnHour;

  const minutes = Math.floor(secondsLeft / secondsInAMinute);
  secondsLeft -= minutes * secondsInAMinute;

  return `https://www.twitch.tv/videos/${vod_id}?t=${hours}h${minutes}m${secondsLeft}s`;
};
