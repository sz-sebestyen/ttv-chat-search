const getSecondsFromDuration = require("../services/TwitchService/getSecondsFromDuration");

describe("getSecondsFromDuration", () => {
  it("should return seconds as an integer", () => {
    // given
    const duration = "20h30m1s";
    const expectedSeconds = 20 * 3600 + 30 * 60 + 1;

    // when
    const result = getSecondsFromDuration(duration);

    // then
    expect(result).toBe(expectedSeconds);
  });

  it("should work if there are no hours in duration", () => {
    // given
    const duration = "50m40s";
    const expectedSeconds = 50 * 60 + 40;

    // when
    const result = getSecondsFromDuration(duration);

    // then
    expect(result).toBe(expectedSeconds);
  });

  it("should work if there are no hours and minutes in duration", () => {
    // given
    const duration = "1000s";
    const expectedSeconds = 1000;

    // when
    const result = getSecondsFromDuration(duration);

    // then
    expect(result).toBe(expectedSeconds);
  });

  it("should return 0 for empty string", () => {
    // given
    const duration = "";
    const expectedSeconds = 0;

    // when
    const result = getSecondsFromDuration(duration);

    // then
    expect(result).toBe(expectedSeconds);
  });
});
