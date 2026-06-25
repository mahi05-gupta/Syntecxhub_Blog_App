import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await registerUser(form);

      const data = res?.data || res;

      console.log("REGISTER RESPONSE:", data);

      // ❌ if backend returns error in success format
      if (!data?.success) {
        alert(data?.message || "Registration failed");
        return;
      }

      const token = data?.token;
      const user = data?.user;

      if (!token || !user) {
        alert("Invalid server response");
        return;
      }

      // 🔥 save current user
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: user?._id,
          name: user?.name || "",
          email: user?.email || "",
          profilePic: user?.profilePic || "",
        })
      );

      // 🔥 add to accounts list (multi-account feature)
      const existing =
        JSON.parse(localStorage.getItem("accounts")) || [];

      const filtered = existing.filter(
        (acc) => acc.user?._id !== user?._id
      );

      localStorage.setItem(
        "accounts",
        JSON.stringify([
          ...filtered,
          {
            token,
            user,
          },
        ])
      );

      alert("Account created successfully");

      navigate("/login"); // safer than auto-login after register
    } catch (error) {
      console.log(
        "REGISTER ERROR:",
        error?.response?.data || error.message
      );

      const msg =
        error?.response?.data?.message ||
        "User already exists or registration failed";

      alert(msg);

      // optional auto redirect
      if (msg.includes("exists")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}