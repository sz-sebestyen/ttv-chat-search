require("dotenv").config({ path: ".env.test" });
const app = require("../../app");

const {
  dbConnect,
  dbDisconnect,
  dbClearCollections,
} = require("../__utils__/memoryMongoDB");
const chatMessageSample = require("../__utils__/chatMessageSample");
const { ChatMessage } = require("../../models");

const supertest = require("supertest");
const request = supertest(app);

jest.mock("node-fetch", () => jest.fn());

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbConnect();
});

afterAll(async () => {
  await dbDisconnect(mongoServer);
});

afterEach(async () => {
  await dbClearCollections([ChatMessage]);
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
    it("should return the messages found", async () => {
      // given
      const vodId = "123";
      const searchTerm = "find me";

      chatMessageSample.content_id = vodId;
      chatMessageSample.message.body = `Filler text 101 ${searchTerm} more filler text`;
      await new ChatMessage(chatMessageSample).save();

      // when
      const response = await request
        .post(`/vod/${vodId}/chat-search?term=${searchTerm}`)
        .set("Accept", "application/json");

      // then
      expect(response.body).toHaveLength(1);
    });
  });
});
