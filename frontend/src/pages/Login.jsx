import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
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
      console.log("LOGIN START");

      const res = await loginUser(form);
      console.log("LOGIN RESPONSE:", res);

      const token = res?.token || res?.data?.token;
      const user = res?.user || res?.data?.user;

      if (!token || !user) {
        alert("Invalid login response");
        return;
      }

      const safeUser = {
        name: user?.name || "",
        email: user?.email || "",
        profilePic: user?.profilePic || "",
      };

      // Save auth state
      login(token, safeUser);

      // Save account for switching
      const existingAccounts =
        JSON.parse(localStorage.getItem("accounts")) || [];

      const updatedAccounts = [
        {
          token,
          user: safeUser,
        },
        ...existingAccounts.filter(
          (acc) => acc?.user?.email !== safeUser.email
        ),
      ];

      localStorage.setItem(
        "accounts",
        JSON.stringify(updatedAccounts)
      );

      console.log("ACCOUNTS SAVED:", updatedAccounts);

      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}