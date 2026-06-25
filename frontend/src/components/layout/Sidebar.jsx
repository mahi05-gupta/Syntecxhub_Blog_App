import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const categories = [
    "All",
    "Technology",
    "Food",
    "Travel",
    "Education",
    "Sports",
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <div className="flex flex-col gap-2">
        {categories.map((cat) => {
          const path = cat === "All" ? "/" : `/category/${cat.toLowerCase()}`;

          const isActive = location.pathname === path;

          return (
            <Link
              key={cat}
              to={path}
              className={`p-2 rounded ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
