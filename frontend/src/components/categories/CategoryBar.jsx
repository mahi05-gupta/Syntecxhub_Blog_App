import { useState } from "react";

export default function CategoryBar({
  selectedCategory,
  setCategory,
}) {
  const [open, setOpen] = useState(false);

  const categories = ["all", "tech", "sports", "food", "travel"];

  const handleSelect = (cat) => {
    setCategory(cat);
    setOpen(false);
  };

  return (
    <div className="flex justify-start my-4 px-4 relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white px-5 py-2 rounded"
      >
        Category ▼
      </button>

      {/* OVERLAY (CLICK OUTSIDE TO CLOSE) */}
      {open && (
        <div className="fixed inset-0 z-40">

          {/* OUTSIDE CLICK AREA */}
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />

          {/* DROPDOWN */}
          <div className="absolute top-20 left-4 w-40 bg-white border rounded shadow-lg z-50">

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selectedCategory === cat
                    ? "bg-gray-200 font-bold"
                    : ""
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}