import api from "./api";

// GET ALL POSTS (optional category support)
export const getPosts = async (category) => {
  const res = await api.get("/posts", {
    params: category ? { category } : {},
  });
  return res.data;
};

// GET SINGLE POST
export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// CREATE POST
export const createPost = async (data) => {
  const res = await api.post("/posts", data);
  return res.data;
};

// UPDATE POST
export const updatePost = async (id, data) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

// DELETE POST
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};