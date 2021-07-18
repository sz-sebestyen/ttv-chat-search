const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;

const DURATION_REGEX = /^(\d+)h(\d+)m(\d+)s$/;

module.exports = (duration) => {
  const match = duration.match(DURATION_REGEX);

  if (!match) {
    throw TypeError("Invalid duration");
  }

  const [, hours, minutes, seconds] = match;

  return hours * SECONDS_IN_AN_HOUR + minutes * SECONDS_IN_A_MINUTE + seconds;
};
