import Post from "../models/post.js";

/* ---------------- ADD COMMENT ---------------- */
export const addComment = async (req, res) => {
  try {
    const { text, username, email } = req.body;

    if (!text || !username) {
      return res.status(400).json({
        message: "Text and username are required",
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // ✅ FIX: ensure comments array exists
    if (!post.comments) {
      post.comments = [];
    }

    // ✅ FIX: fallback email if undefined
    const safeEmail = email || "anonymous@example.com";

    post.comments.push({
      text,
      username,
      email: safeEmail,
    });

    await post.save();

    return res.status(201).json(post.comments);
  } catch (error) {
    console.log("ADD COMMENT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
/* ---------------- GET COMMENTS ---------------- */
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post.comments || []);
  } catch (error) {
    console.log("GET COMMENTS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- UPDATE COMMENT ---------------- */
export const updateComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { text, username } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ✅ ownership check
    if (comment.username !== username) {
      return res.status(403).json({
        message: "You can only edit your own comments",
      });
    }

    comment.text = text;

    await post.save();

    res.status(200).json(comment);
  } catch (error) {
    console.log("UPDATE COMMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
/* ---------------- DELETE COMMENT ---------------- */
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { username } = req.body; // ✅ FIX HERE

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // ✅ FIXED CHECK
    if (comment.username !== username) {
      return res.status(403).json({
        message: "You can only delete your own comments",
      });
    }

    comment.deleteOne();

    await post.save();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log("DELETE COMMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};