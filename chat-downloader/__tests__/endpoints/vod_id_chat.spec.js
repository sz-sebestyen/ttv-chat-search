require("dotenv").config({ path: ".env.test" });
const app = require("../../app");

const vodInfoSample = require("../__utils__/vodInfoSample");
const chatMessageSample = require("../__utils__/chatMessageSample");
const { ChatMessage, VodInfo } = require("../../models");

const supertest = require("supertest");
const request = supertest(app);

const nock = require("nock");

const twitchApi = require("../../TwitchApi");

const {
  dbConnect,
  dbDisconnect,
  dbClearCollections,
} = require("../__utils__/memoryMongoDB");

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_ACCESS_TOKEN } =
  process.env;

twitchApi.setCredentials({
  clientId: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  accessToken: TWITCH_ACCESS_TOKEN,
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbConnect();
});

afterAll(async () => {
  await dbDisconnect(mongoServer);
  nock.cleanAll();
});

afterEach(async () => {
  await dbClearCollections([ChatMessage, VodInfo]);
});

describe("POST /vod/:id/chat", () => {
  describe("when the VOD exists, but it is not in the database", () => {
    it("should download the chat, and save it in the database", async () => {
      // given
      const vodId = "123";

      vodInfoSample.id = vodId;

      const vodResponseSample = { data: [vodInfoSample] };

      chatMessageSample.content_id = vodId;
      const chatPageResponseSample = {
        comments: [chatMessageSample],
        _next: null,
      };

      nock("https://api.twitch.tv")
        .get("/helix/videos")
        .query({ id: vodId })
        .reply(200, vodResponseSample);

      nock("https://api.twitch.tv")
        .persist()
        .get(`/v5/videos/${vodId}/comments`)
        .query(() => true)
        .reply(200, chatPageResponseSample);

      // when
      const response = request
        .post(`/vod/${vodId}/chat`)
        .set("Accept", "application/json");

      // then
      await response.expect(200);

      // TODO: wait for download another way
      await new Promise((resolve) => setTimeout(() => resolve(), 1000));

      const comments = await ChatMessage.find({ content_id: vodId });

      expect(comments.length).toBeTruthy();
    });
  });

  describe("when the VOD doesn't exist", () => {
    it("should return 404", async () => {
      // given
      const vodId = "123";

      nock("https://api.twitch.tv")
        .get("/helix/videos")
        .query({ id: vodId })
        .reply(404, { message: "vod not found" });

      // when
      const response = request
        .post(`/vod/${vodId}/chat`)
        .set("Accept", "application/json");

      // then
      await response.expect(404);
    });
  });
});
