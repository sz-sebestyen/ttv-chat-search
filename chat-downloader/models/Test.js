const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestSchema = new Schema({
  comment: {
    type: String,
  },
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
