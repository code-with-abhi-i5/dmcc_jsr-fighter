import imageCompression from "browser-image-compression";

/**
 * Compresses and resizes an image file before upload.
 * Targets a max size of 800KB and max dimensions of 1024px.
 */
export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: "image/jpeg",
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    // Return original file if compression fails
    return file;
  }
}

/**
 * Validates image file type and size.
 * Returns an error message or null if valid.
 */
export function validateImageFile(file) {
  if (!file) return "Please select a photo";

  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return "Please upload a JPG, PNG, or WebP image";
  }

  // Max 10MB before compression
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Image size must be less than 10MB";
  }

  return null;
}
