export default function Input({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
    required = false,
  }) {
    return (
      <div className="mb-3">
        {label && (
          <label className="block mb-1 text-sm font-medium">
            {label}
          </label>
        )}
  
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        />
      </div>
    );
  }