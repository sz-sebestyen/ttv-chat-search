const SECONDS_IN_A_SECOND = 1;
const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;

const HOURS_POSTFIX = "h";
const MINUTES_POSTFIX = "m";
const SECONDS_POSTFIX = "s";

const postfixToSecondsMapings = [
  { postfix: HOURS_POSTFIX, seconds: SECONDS_IN_AN_HOUR },
  { postfix: MINUTES_POSTFIX, seconds: SECONDS_IN_A_MINUTE },
  { postfix: SECONDS_POSTFIX, seconds: SECONDS_IN_A_SECOND },
];

const getDigitsWithPostfixRegex = (postfix) => new RegExp(`(\\d+)${postfix}`);

module.exports = (duration) => {
  const SECONDS_INIT = 0;

  return postfixToSecondsMapings.reduce((seconds, mapping) => {
    const regex = getDigitsWithPostfixRegex(mapping.postfix);

    const match = duration.match(regex);

    return match ? seconds + match[1] : seconds;
  }, SECONDS_INIT);
};
