require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const fetch = require("node-fetch");

const vodInfoSample = require("../__utils__/vodInfoSample");

const supertest = require("supertest");
const request = supertest(app);

jest.mock("node-fetch", () => jest.fn());

describe("POST /vod/:id/chat", () => {
  describe("when the VOD exists", () => {
    it("should return 200", async () => {
      // given
      fetch.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => vodInfoSample,
        })
      );

      // when
      const response = request
        .post("/vod/123/chat")
        .set("Accept", "application/json");

      // then
      await response.expect(200);
    });
  });

  describe("when the VOD doesn't exists", () => {
    it("should return 404", async () => {
      // given
      fetch.mockImplementation(() =>
        Promise.resolve({
          status: 404,
          json: () => ({}),
        })
      );

      // when
      const response = request
        .post("/vod/123/chat")
        .set("Accept", "application/json");

      // then
      await response.expect(404);
    });
  });
});
