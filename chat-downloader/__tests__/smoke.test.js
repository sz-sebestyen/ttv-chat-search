const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { ChatMessage } = require("../models");

const {
  dbConnect,
  dbDisconnect,
  dbClearCollections,
} = require("./__utils__/memoryMongoDB");

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbConnect();
});

afterAll(async () => {
  await dbDisconnect(mongoServer);
});

describe("smoke test", () => {
  it("should pass, so we know that jest is working", () => {
    expect(1).not.toBe(2);
  });

  it("should return 404, so we know that supertest works", async () => {
    const res = request.get("/api");

    await res.expect(404);
  });

  it("should not thorw, so we know that the memory DB works", () => {
    const testMemoryDBAvailability = async () => {
      const messagesFound = await ChatMessage.find();

      expect(messagesFound).toHaveLength(0);
    };

    expect(testMemoryDBAvailability).not.toThrow();
  });
});
