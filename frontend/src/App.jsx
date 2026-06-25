import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Posts */}
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/category/:name" element={<CategoryPage />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Route>

      {/* Redirect old /home → / */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />

    </Routes>
  );
}

export default App;