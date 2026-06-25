import mongoose from "mongoose";

/* ---------------- COMMENT SCHEMA ---------------- */
const CommentSchema = new mongoose.Schema({
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
    default: "anonymous@example.com",
  }, // ✅ FIXED: comma added

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ---------------- POST SCHEMA ---------------- */
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    default: "",
  },

  username: {
    type: String,
    required: true,
  },

  categories: {
    type: [String],
    default: [],
  },

  comments: {
    type: [CommentSchema],
    default: [],
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

/* ---------------- MODEL ---------------- */
const Post = mongoose.model("Post", PostSchema);

export default Post;