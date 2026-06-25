import { IMAGE_BASE_URL } from "./constants";

// TEXT TRUNCATE
export const truncateText = (text = "", limit = 100) => {
  if (typeof text !== "string") return "";

  return text.length > limit
    ? text.slice(0, limit) + "..."
    : text;
};

// DATE FORMAT
export const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-IN");
};

// IMAGE HANDLER
export const getImage = (img) => {
  // No image
  if (!img) {
    return "https://via.placeholder.com/600x400?text=No+Image";
  }

  // Base64 image
  if (img.startsWith("data:image")) {
    return img;
  }

  // Full URL image
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }

  // Backend image path
  return `${IMAGE_BASE_URL}${img}`;
};