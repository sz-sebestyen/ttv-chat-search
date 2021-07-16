module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const TestSchema = Schema({
    comment: {
      type: String,
    },
  });

  return mongoose.model("Test", TestSchema);
};
