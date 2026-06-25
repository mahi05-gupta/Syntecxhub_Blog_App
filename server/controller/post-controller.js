import Post from "../models/post.js";

/* ---------------- CREATE POST ---------------- */
export const createPost = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const postData = {
      ...req.body,

      // FORCE categories ALWAYS ARRAY
      categories: req.body.categories
        ? Array.isArray(req.body.categories)
          ? req.body.categories.map((c) => c.toLowerCase())
          : [req.body.categories.toLowerCase()]
        : [],
    };

    const post = await Post.create(postData);

    res.status(201).json(post);
  } catch (error) {
    console.log("CREATE POST ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- GET ALL POSTS (FIXED) ---------------- */
export const getAllPosts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    // CATEGORY FILTER (SAFE + CASE INSENSITIVE)
    if (category && category !== "all") {
      filter.categories = {
        $regex: new RegExp(category, "i"),
      };
    }

    const posts = await Post.find(filter).sort({ createdDate: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log("GET POSTS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- GET SINGLE POST ---------------- */
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log("GET POST BY ID ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- UPDATE POST ---------------- */
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          categories: req.body.categories
            ? Array.isArray(req.body.categories)
              ? req.body.categories.map((c) => c.toLowerCase())
              : [req.body.categories.toLowerCase()]
            : [],
        },
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log("UPDATE POST ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- DELETE POST ---------------- */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log("DELETE POST ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};