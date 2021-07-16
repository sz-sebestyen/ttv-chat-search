const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

module.exports = async (mongoose) => {
  const { DB_CONNECTION } = process.env;

  try {
    const connection = await mongoose.connect(DB_CONNECTION, mongooseOptions);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("mongoose connection error: ", error);
  }
};
