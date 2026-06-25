import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/categories/CategoryBar";
import PostList from "../components/posts/PostList";
import { useFetchPosts } from "../hooks/useFetchPosts";

export default function Home() {
  const [category, setCategory] = useState("all");

  const { posts, loading, fetchPosts } = useFetchPosts(category);

  return (
    <div className="w-full">

      <Navbar />

      <CategoryBar
        selectedCategory={category}
        setCategory={setCategory}
      />

      {loading ? (
        <p className="text-center mt-5">Loading posts...</p>
      ) : (
        <PostList posts={posts} refreshPosts={fetchPosts} />
      )}

    </div>
  );
}