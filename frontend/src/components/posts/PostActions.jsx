import { useNavigate } from "react-router-dom";
import { deletePost } from "../../services/postServices";

export default function PostAction({ postId, refresh }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(postId);

      refresh?.(); // safer

      navigate("/home"); // FIXED
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => navigate(`/post/${postId}`)}
        className="px-3 py-2 bg-green-600 text-white rounded"
      >
        View
      </button>

      <button
        onClick={() => navigate(`/edit/${postId}`)}
        className="px-3 py-2 bg-blue-600 text-white rounded"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="px-3 py-2 bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
}