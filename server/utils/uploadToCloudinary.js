import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
/**
 * Uploads a file to Cloudinary and returns the result
 * @param {Buffer} buffer - File buffer (req.file.buffer)
 * @param {string} originalname - Original file name
 * @returns {Promise<object>} - Cloudinary upload result
 */
export const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: uuidv4(),
        folder: "secure-files",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Write buffer to Cloudinary
    stream.end(buffer);
  });
};
