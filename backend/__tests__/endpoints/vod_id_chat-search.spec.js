require("dotenv").config({ path: ".env.test" });
const app = require("../../app");

const {
  dbConnect,
  dbDisconnect,
  dbClearCollections,
} = require("../__utils__/memoryMongoDB");
const chatMessageSample = require("../__utils__/chatMessageSample");
const { ChatMessage, UserSearchHistory } = require("../../models");

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
  await dbClearCollections([ChatMessage, UserSearchHistory]);
});

describe("POST /vod/:id/chat-search?term=<search-term>", () => {
  describe("when term is missing", () => {
    it("should return 400", async () => {
      // when
      const response = request
        .post("/vod/123/chat-search")
        .set("Accept", "application/json");

      // then
      await response.expect(400);
    });
  });

  describe("when the search term is given", () => {
    const userId = "user123";
    const vodId = "123";
    const searchTerm = "find me";

    chatMessageSample.content_id = vodId;
    chatMessageSample.message.body = `Filler text 101 ${searchTerm} more filler text`;

    describe("and missing x-user_id header", () => {
      it("should return the messages found, but should not save the search in the users search history", async () => {
        // given
        await new ChatMessage(chatMessageSample).save();

        // when
        const response = await request
          .post(`/vod/${vodId}/chat-search?term=${searchTerm}`)
          .set("Accept", "application/json");

        // then
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);

        const userSearchHistoryCount = await UserSearchHistory.countDocuments(
          {}
        );
        expect(userSearchHistoryCount).toBe(0);
      });
    });

    describe("and x-user_id header is present", () => {
      it("should return the messages found and save the search in the users search history", async () => {
        // given

        await new ChatMessage(chatMessageSample).save();

        // when
        const response = await request
          .post(`/vod/${vodId}/chat-search?term=${searchTerm}`)
          .set("Accept", "application/json")
          .set("X-user_id", userId);

        // then
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);

        const userSearchHistory = await UserSearchHistory.findOne({ userId });
        expect(userSearchHistory).toBeTruthy();
      });
    });
  });
});
