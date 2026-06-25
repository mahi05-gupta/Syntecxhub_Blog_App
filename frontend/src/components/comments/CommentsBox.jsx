import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../services/postServices";
import PostCard from "../posts/PostCard";

export default function CategoryBar() {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await getPosts(); // FIXED
      setPosts(res.data || []);
    } catch (error) {
      console.log(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [name]);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refresh={fetchPosts}
        />
      ))}
    </div>
  );
}