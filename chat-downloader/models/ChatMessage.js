const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommenterSchema = new Schema({
  original_id: {
    type: String,
    required: true,
  },
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
  original_id: {
    type: String,
    required: true,
  },
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

ChatMessageSchema.index({ created_at: 1, "message.body": "text" });

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;
