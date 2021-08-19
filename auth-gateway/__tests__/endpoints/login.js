require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);

describe("GET /login", () => {
  it("should redirect", async () => {
    // when
    const response = request.get(`/login`);

    // then
    await response.expect(302);
  });
});
