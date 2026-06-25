import { useEffect, useState } from "react";
import { getPosts } from "../services/postServices";

export const useFetchPosts = (category) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await getPosts(category);

      console.log("POSTS RECEIVED:", res);

      // Axios safe handling
      const data = res?.data ?? res;

      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  return {
    posts,
    loading,
    fetchPosts,
  };
};