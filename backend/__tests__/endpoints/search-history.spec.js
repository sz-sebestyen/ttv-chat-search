require("dotenv").config({ path: ".env.test" });
const app = require("../../app");

const {
  dbConnect,
  dbDisconnect,
  dbClearCollections,
} = require("../__utils__/memoryMongoDB");
const { UserSearchHistory } = require("../../models");

const supertest = require("supertest");
const request = supertest(app);

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbConnect();
});

afterAll(async () => {
  await dbDisconnect(mongoServer);
});

afterEach(async () => {
  await dbClearCollections([UserSearchHistory]);
});

describe("GET /search-history", () => {
  describe("when x-user_id header is missing", () => {
    it("should return 401", async () => {
      // when
      const response = request
        .get("/search-history")
        .set("Accept", "application/json");

      // then
      await response.expect(401);
    });
  });

  describe("when x-user_id header is included", () => {
    it("should return the messages found", async () => {
      // given
      const userId = "123";
      const searches = [
        { vodId: "123", term: "hello" },
        { vodId: "123", term: "some emote" },
        { vodId: "123", term: "ridiculous statement" },
      ];

      const userSearchHistory = { userId, searches };

      await new UserSearchHistory(userSearchHistory).save();

      // when
      const response = await request
        .get("/search-history")
        .set("Accept", "application/json")
        .set("X-user_id", userId);

      // then
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(searches.length);
    });
  });
});
