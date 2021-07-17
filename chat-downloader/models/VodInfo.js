const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VodInfoSchema = Schema({
  id: {
    type: String,
    required: true,
  },
  // stream_id: {
  //   type: String,
  // },
  // user_id: {
  //   type: String,
  // },
  // user_login: {
  //   type: String,
  // },
  user_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  // },
  // created_at: {
  //   type: String,
  // },
  // published_at: {
  //   type: String,
  // },
  url: {
    type: String,
    required: true,
  },
  // thumbnail_url: {
  //   type: String,
  // },
  viewable: {
    type: String,
    required: true,
  },
  // view_count: {
  //   type: Number,
  // },
  // language: {
  //   type: String,
  // },
  // type: {
  //   type: String,
  // },
  duration: {
    type: String,
    required: true,
  },
  // muted_segments: [
  //   {
  //     duration: { type: Number },
  //     offset: { type: Number },
  //   },
  // ],
});

VodInfoSchema.index({ id: 1 });

const VodInfo = mongoose.model("VodInfo", VodInfoSchema);

module.exports = VodInfo;
