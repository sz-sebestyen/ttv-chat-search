require("dotenv").config({ path: ".env.test" });
const app = require("../../app");

const vodInfoSample = require("../__utils__/vodInfoSample");
const { VodInfo } = require("../../models");

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
});

describe("GET /vod/:id", () => {
  describe("when the VOD exists, but it is not in the database", () => {
    it("should return the vodInfo, and save it in the database", async () => {
      // given
      const vodId = "123";

      vodInfoSample.id = vodId;

      const responseSample = { data: [vodInfoSample] };

      nock("https://api.twitch.tv", {
        reqheaders: {
          "client-id": TWITCH_CLIENT_ID,
        },
      })
        .get("/helix/videos")
        .query({ id: vodId })
        .reply(200, responseSample);

      // when
      const response = await request
        .get(`/vod/${vodId}`)
        .set("Accept", "application/json");

      // then
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(vodId);

      const vodInfo = await VodInfo.findOne({ id: vodId });

      expect(vodInfo).toBeTruthy();
    });
  });
});
