import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (cat) => {
    setOpen(false);
    navigate(`/category/${cat}`);
  };

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 bg-gray-800 text-white rounded"
      >
        Category
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="fixed inset-0 z-50">

          {/* OUTSIDE CLICK AREA */}
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />

          {/* MENU BOX */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white text-black shadow-lg rounded w-48">

            <button
              onClick={() => handleSelect("all")}
              className="w-full px-4 py-2 hover:bg-gray-100"
            >
              All
            </button>

            <button
              onClick={() => handleSelect("Tech")}
              className="w-full px-4 py-2 hover:bg-gray-100"
            >
              Tech
            </button>

            <button
              onClick={() => handleSelect("Sports")}
              className="w-full px-4 py-2 hover:bg-gray-100"
            >
              Sports
            </button>

            <button
              onClick={() => handleSelect("Food")}
              className="w-full px-4 py-2 hover:bg-gray-100"
            >
              Food
            </button>

            <button
              onClick={() => handleSelect("Travel")}
              className="w-full px-4 py-2 hover:bg-gray-100"
            >
              Travel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}