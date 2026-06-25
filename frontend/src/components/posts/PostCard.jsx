import { useNavigate } from "react-router-dom";
import { deletePost } from "../../services/postServices";
import { truncateText, getImage } from "../../utils/helpers";
import Button from "../ui/Button";

export default function PostCard({ post, refresh }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post._id);

      alert("Post deleted successfully");

      if (refresh) {
        await refresh();
      }
    } catch (error) {
      console.log("DELETE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete post"
      );
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white h-full flex flex-col">
      {/* Title */}
      <h2
        className="text-xl font-bold cursor-pointer mb-2 hover:text-blue-600"
        onClick={() => navigate(`/post/${post._id}`)}
      >
        {post.title}
      </h2>

      {/* Image */}
      {post.picture && (
        <img
          src={getImage(post.picture)}
          alt={post.title}
          className="w-full h-60 object-cover rounded mb-3"
        />
      )}

      {/* Category */}
      <p className="text-sm text-gray-500 mb-2">
        {Array.isArray(post.categories)
          ? post.categories.join(", ")
          : post.categories}
      </p>

      {/* Description */}
      <p className="text-gray-700 flex-1">
        {truncateText(post.description || "", 120)}
      </p>

      {/* Buttons */}
      {/* Buttons */}
<div className="flex gap-2 mt-4">
  <Button onClick={() => navigate(`/edit/${post._id}`)}>
    Edit
  </Button>

  <Button
    variant="danger"
    onClick={handleDelete}
  >
    Delete
  </Button>

  <Button
    variant="secondary"
    onClick={() => navigate(`/post/${post._id}`)}
  >
    Comment
  </Button>
</div>
    </div>
  );
}