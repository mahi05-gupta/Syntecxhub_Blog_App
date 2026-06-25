export default function Button({
    children,
    onClick,
    variant = "primary",
    className = "",
    type = "button",
    disabled = false,
  }) {
    const styles = {
      primary: "bg-black text-white hover:bg-gray-800",
      secondary: "bg-gray-200 text-black hover:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded transition duration-200 ${
          styles[variant]
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {children}
      </button>
    );
  }