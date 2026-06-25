import express from "express";

import { login, register } from "../controller/user-controller.js";

import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";

import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controller/comment-controller.js";

import {
  upload,
  uploadImage,
} from "../controller/upload-controller.js";

const router = express.Router();

// AUTH
router.post("/auth/register", register);
router.post("/auth/login", login);

// POSTS
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

// COMMENTS
// COMMENTS
router.post("/posts/:postId/comments", addComment);

router.get("/posts/:postId/comments", getComments);

router.put(
  "/posts/:postId/comments/:commentId",
  updateComment
);

router.delete(
  "/posts/:postId/comments/:commentId",
  deleteComment
);
// UPLOAD
router.post(
  "/upload",
  upload.single("file"),
  uploadImage
);

export default router;