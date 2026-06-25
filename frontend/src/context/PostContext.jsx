import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helpers (cleaner than using setPosts everywhere)
  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        currentPost,
        setCurrentPost,
        loading,
        setLoading,
        error,
        setError,
        addPost,
        removePost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// safe hook
export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used inside PostProvider");
  }

  return context;
};