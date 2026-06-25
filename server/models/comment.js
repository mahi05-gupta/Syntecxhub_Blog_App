import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;