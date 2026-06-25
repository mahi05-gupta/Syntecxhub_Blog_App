import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ BACK BUTTON

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH POST
  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
      setComments(res.data.comments || []);
    } catch (error) {
      console.log("FETCH POST ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // ADD COMMENT
  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);

      const storedUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const username =
        storedUser?.name ||
        storedUser?.username ||
        "Anonymous";

      await api.post(`/posts/${id}/comments`, {
        text: comment,
        username,
        email: storedUser?.email,
      });

      setComment("");
      await fetchPost();
    } catch (error) {
      console.log("COMMENT ERROR:", error);
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  // DELETE COMMENT
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(
        `/posts/${id}/comments/${commentId}`,
        {
          data: {
            username: user?.name,
          },
        }
      );

      await fetchPost();
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to delete comment"
      );
    }
  };

  // EDIT COMMENT
  const handleEditComment = async (commentObj) => {
    const newText = prompt("Edit Comment", commentObj.text);

    if (!newText || !newText.trim()) return;

    try {
      await api.put(
        `/posts/${id}/comments/${commentObj._id}`,
        {
          text: newText,
          username: user?.name,
        }
      );

      await fetchPost();
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to edit comment"
      );
    }
  };

  if (!post) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* ✅ BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-3">
        {post.title}
      </h1>

      {/* IMAGE */}
      {post.picture && (
        <img
          src={`http://localhost:5000${post.picture}`}
          alt={post.title}
          className="w-full h-96 object-cover rounded mb-4"
        />
      )}

      {/* DESCRIPTION */}
      <p className="mb-6">{post.description}</p>

      <hr className="mb-6" />

      {/* COMMENT INPUT */}
      <h2 className="text-xl font-bold mb-3">
        Comments ({comments.length})
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 flex-1 rounded"
        />

        <button
          onClick={handleComment}
          disabled={loading}
          className="bg-black text-white px-4 rounded disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* COMMENTS */}
      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c._id} className="border p-3 rounded">
              <p className="font-semibold">
                {c.username || "Anonymous"}
              </p>

              <p className="mt-1">{c.text}</p>

              {c.createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              )}

              {/* ONLY OWNER CAN EDIT/DELETE */}
              {c.username === user?.name && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditComment(c)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteComment(c._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}