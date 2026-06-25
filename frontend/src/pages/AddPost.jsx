import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";

export default function AddPost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Food",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      // ❗ prevent posting without login
      if (!user?.name) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      let imageUrl = "";

      // upload image
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = uploadRes.data.imageUrl;
      }

      await api.post("/posts", {
        title: form.title,
        description: form.description,
        picture: imageUrl,
        categories: [form.category],
        username: user.name, // ✅ always real username
      });

      alert("Post created successfully");
      navigate("/home");
    } catch (error) {
      console.error("CREATE POST ERROR:", error);
      console.error("SERVER RESPONSE:", error?.response?.data);

      alert(
        error?.response?.data?.message ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Back
      </Button>

      <h2 className="text-2xl font-bold mb-4">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Post Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          className="border p-2 w-full mb-3 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        >
          <option value="Food">Food</option>
          <option value="Tech">Tech</option>
          <option value="Travel">Travel</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}