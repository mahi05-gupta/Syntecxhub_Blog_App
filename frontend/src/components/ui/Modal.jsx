import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // click outside to close
    >
      <div
        className="bg-white p-5 rounded w-96 relative"
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
}