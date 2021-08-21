const getTimestamp = require("./getTimestamp");

describe("getTimestamp", () => {
  it("should return timestamp", () => {
    // given
    const seconds = 3 * 3600 + 15 * 60 + 11;
    const expectedTimestamp = "20h30m1s";

    // when
    const result = getTimestamp(seconds);

    // then
    expect(result).toBe(expectedTimestamp);
  });
});
