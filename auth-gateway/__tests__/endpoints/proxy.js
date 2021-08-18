require("dotenv").config({ path: ".env.test" });
const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const nock = require("nock");

describe("/*", () => {
  it("should proxy the request", async () => {
    // given
    const path = "/custom-path";

    nock(process.env.BACKEND_HOST).get(path).reply(200, {
      messge: "OK",
    });

    // when
    const response = request.get(path);

    // then
    await response.expect(200);
  });
});
