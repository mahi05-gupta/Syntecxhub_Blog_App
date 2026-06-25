import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AddPost from "../pages/AddPost";
import EditPost from "../pages/EditPost";
import PostDetails from "../pages/PostDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryPage from "../pages/CategoryPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/category/:name" element={<CategoryPage />} />

      {/* Protected pages (TEMP SAFE - no crash) */}
      <Route path="/add" element={<AddPost />} />
      <Route path="/edit/:id" element={<EditPost />} />

      {/* 404 */}
      <Route path="*" element={<h1 className="p-4">404 Not Found</h1>} />
    </Routes>
  );
}