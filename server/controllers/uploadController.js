import cloudinary from "../config/cloudinary.js";

export async function uploadImage(req, res) {
  if (!req.file) return res.status(400).json({ message: "Image file is required" });
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(500).json({ message: "Cloudinary is not configured. Add Cloudinary env variables." });
  }
  const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64, { folder: "zayura/products" });
  res.status(201).json({ url: result.secure_url, publicId: result.public_id });
}
