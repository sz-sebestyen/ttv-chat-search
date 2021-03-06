require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");

const fetch = require("node-fetch");
jest.mock("node-fetch", () => jest.fn());

describe("POST /code", () => {
  describe("when jwt (with sub included in the payload) is in the response", () => {
    it("should return 200", async () => {
      // given
      const sub = "userId";
      const id_token = jwt.sign({ sub }, process.env.JWT_SECRET);

      fetch.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => ({ id_token }),
        })
      );

      // when
      const response = request
        .post(`/code?code=asd`)
        .set("Accept", "application/json");

      // then
      await response
        .expect((res) => {
          const decoded = jwt.decode(res.body.token);
          res.body = { sub: decoded.sub };
        })
        .expect(200, { sub });
    });
  });

  describe("when the jwt response doesn't include id_token", () => {
    it("should return 401", async () => {
      // given

      fetch.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => ({}),
        })
      );

      // when
      const response = request
        .post(`/code?code=asd`)
        .set("Accept", "application/json");

      // then
      await response.expect(401);
    });
  });

  describe("when the code is missing", () => {
    it("should return 400", async () => {
      // when
      const response = request.post(`/code`).set("Accept", "application/json");

      // then
      await response.expect(400);
    });
  });
});
