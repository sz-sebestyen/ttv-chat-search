const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommenterSchema = new Schema({
  display_name: {
    type: String,
    required: true,
  },
});

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user_color: {
    type: String,
  },
});

const ChatMessageSchema = new Schema({
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  channel_id: {
    type: String,
  },
  content_type: {
    type: String,
    required: true,
  },
  content_id: {
    type: String,
    required: true,
  },
  content_offset_seconds: {
    type: Number,
    required: true,
  },
  commenter: CommenterSchema,
  message: MessageSchema,
});

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;
