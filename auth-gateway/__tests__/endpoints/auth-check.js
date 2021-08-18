require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");

describe("/auth-check", () => {
  describe("when no auth token is present", () => {
    it("should return 401", async () => {
      // given
      const token = "";

      // when
      const response = request
        .get(`/auth-check`)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`);

      // then
      await response.expect(401);
    });
  });

  describe("when auth token is present", () => {
    it("should return 200", async () => {
      // given
      const sub = "user id";

      const token = jwt.sign({ sub }, process.env.JWT_SECRET);

      // when
      const response = request
        .get(`/auth-check`)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`);

      // then
      await response.expect(200);
    });
  });
});
