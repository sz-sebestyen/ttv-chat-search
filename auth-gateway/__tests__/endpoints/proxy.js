require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const nock = require("nock");
const jwt = require("jsonwebtoken");

describe("ALL /*", () => {
  // given
  const sub = "user id";

  const token = jwt.sign({ sub }, process.env.JWT_SECRET);

  const path = "/custom-path";

  beforeEach(() => {
    nock(process.env.BACKEND_HOST, {
      reqheaders: {
        "x-user_id": (headerValue) => headerValue === sub,
      },
    })
      .get(path)
      .reply(200, "x-user_id included");

    nock(process.env.BACKEND_HOST, {
      badheaders: ["x-user_id"],
    })
      .get(path)
      .reply(200, "no x-user_id header");
  });

  describe("when no authorized Bearer token is in the header", () => {
    it("should proxy the request without the x-user_id in the header", async () => {
      // when
      const response = request.get(path);

      // then
      await response.expect(200, "no x-user_id header");
    });
  });

  describe("when authorized Bearer token is in the header", () => {
    it("should proxy the request with the x-user_id included in the header", async () => {
      // when
      const response = request
        .get(path)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`);

      // then
      await response.expect(200, "x-user_id included");
    });
  });
});
