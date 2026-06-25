import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const post = res.data;

        setForm({
          title: post.title || "",
          description: post.description || "",
          category: post.categories?.[0] || "",
          image: post.picture || "",
        });

        if (post.picture) {
          setPreview(`http://localhost:5000${post.picture}`);
        }
      } catch (error) {
        console.log("LOAD POST ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      let imageUrl = form.image;

      // Upload new image if selected
      if (form.image instanceof File) {
        const formData = new FormData();
        formData.append("file", form.image);

        const uploadRes = await api.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      await api.put(`/posts/${id}`, {
        title: form.title,
        description: form.description,
        picture: imageUrl,
        categories: [form.category],
      });

      alert("Post updated successfully");
      navigate("/");
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      alert("Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading post...</p>;
  }

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
        Edit Post
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        name="description"
        placeholder="Post Description"
        value={form.description}
        onChange={handleChange}
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
        onChange={handleImageChange}
        className="border p-2 w-full mb-4 rounded"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <button
        onClick={handleUpdate}
        disabled={updating}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {updating ? "Updating..." : "Update Post"}
      </button>
    </div>
  );
}