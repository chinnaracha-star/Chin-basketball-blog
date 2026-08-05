import multer from "multer";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_SIZE, files: 1 },
  fileFilter(req, file, callback) {
    if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
      callback(new Error("Only JPEG, PNG, GIF and WebP images are allowed"));
      return;
    }

    callback(null, true);
  },
});

const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);

export default function uploadPostImage(req, res, next) {
  imageFileUpload(req, res, (error) => {
    if (!error) return next();

    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Image must be smaller than 5MB"
        : error.message;

    return res.status(400).json({ message });
  });
}
