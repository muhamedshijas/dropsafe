import { populate } from "dotenv";
import File from "../models/fileModel.js"; // your Mongoose model
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

export async function uploadFile(req, res) {
  try {
    const { title, userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log(userId);

    // Convert file size to readable format
    const getReadableSize = (sizeInBytes) => {
      if (sizeInBytes >= 1e9) return (sizeInBytes / 1e9).toFixed(2) + " GB";
      if (sizeInBytes >= 1e6) return (sizeInBytes / 1e6).toFixed(2) + " MB";
      if (sizeInBytes >= 1e3) return (sizeInBytes / 1e3).toFixed(2) + " KB";
      return sizeInBytes + " B";
    };

    const readableSize = getReadableSize(file.size);

    const result = await uploadToCloudinary(file.buffer, file.originalname);
    // Create and save file document
    const newFile = new File({
      filename: title,
      originalName: file.originalname,
      size: readableSize, // 👈 human-readable size string
      mimeType: file.mimetype,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      user: userId,
    });

    await newFile.save();
    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        id: newFile._id,
        filename: newFile.originalName,
        originalName: newFile.filename,
        size: newFile.size,
        mimeType: newFile.mimeType,
        fileUrl: newFile.fileUrl,
        publicId: newFile.publicId,
        uploadedAt: newFile.uploadedAt,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Server error during file upload" });
  }
}
export async function getAllFiles(req, res) {
  const userId = req.params.id;
  const files = await File.find({ user: userId }).populate("user").lean();
  return res.json({ success: true, files });
}
export async function deleteFile(req, res) {
  console.log("hii");
  
  const { id } = req.params;

  try {
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: "raw",
    });

    // Delete from MongoDB
    await File.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Error deleting file" });
  }
}
