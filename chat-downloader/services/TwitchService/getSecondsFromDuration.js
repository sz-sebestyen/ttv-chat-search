const SECONDS_IN_A_SECOND = 1;
const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;

const postfixToSecondsMaps = [
  { postfix: "h", seconds: SECONDS_IN_AN_HOUR },
  { postfix: "m", seconds: SECONDS_IN_A_MINUTE },
  { postfix: "s", seconds: SECONDS_IN_A_SECOND },
];

const SECONDS_INIT = 0;

const getSecondsFromDuration = (duration) => {
  return postfixToSecondsMaps.reduce((allSeconds, { postfix, seconds }) => {
    const regex = new RegExp(`(\\d+)${postfix}`);

    const match = duration.match(regex);

    return match ? allSeconds + match[1] * seconds : allSeconds;
  }, SECONDS_INIT);
};

module.exports = getSecondsFromDuration;
