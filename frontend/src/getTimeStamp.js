const minutesInAnHour = 60;

const secondsInAMinute = 60;
const secondsInAnHour = secondsInAMinute * minutesInAnHour;

const getTimeStamp = (content_offset_seconds) => {
  let secondsLeft = Math.floor(content_offset_seconds);

  const hours = Math.floor(secondsLeft / secondsInAnHour);
  secondsLeft -= hours * secondsInAnHour;

  const minutes = Math.floor(secondsLeft / secondsInAMinute);
  secondsLeft -= minutes * secondsInAMinute;

  return `${hours}h${minutes}m${secondsLeft}s`;
};

export default getTimeStamp;
