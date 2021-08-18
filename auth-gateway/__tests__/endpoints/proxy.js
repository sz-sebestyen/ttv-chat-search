require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const nock = require("nock");
const jwt = require("jsonwebtoken");

describe("/*", () => {
  describe("when no authorized Bearer token is in the header", () => {
    it("should proxy the request without the x-user_id in the header", async () => {
      // given
      const path = "/custom-path";

      nock(process.env.BACKEND_HOST)
        .get(path)
        .reply(200, {
          reqheaders: {
            "X-user_id": (headerValue) => !headerValue,
          },
        });

      // when
      const response = request.get(path);

      // then
      await response.expect(200);
    });
  });

  describe("when authorized Bearer token is in the header", () => {
    it("should proxy the request with the x-user_id included in the header", async () => {
      // given
      const sub = "user id";

      const token = jwt.sign({ sub }, process.env.JWT_SECRET);

      const path = "/custom-path";

      nock(process.env.BACKEND_HOST)
        .get(path)
        .reply(200, {
          reqheaders: {
            "X-user_id": (headerValue) => headerValue === sub,
          },
        });

      // when
      const response = request
        .get(path)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`);

      // then
      await response.expect(200);
    });
  });
});
