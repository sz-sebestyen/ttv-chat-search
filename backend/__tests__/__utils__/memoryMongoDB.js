const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

exports.dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);

  return mongoServer;
};

exports.dbDisconnect = async (mongoServer) => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

exports.dbClearCollections = async (models) => {
  const deletions = models.map((model) => model.deleteMany({}));

  await Promise.all(deletions);
};
