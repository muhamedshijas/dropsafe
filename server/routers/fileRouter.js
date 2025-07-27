import express from "express";
import upload from "../middlewares/multer.js";
import {
  deleteFile,
  getAllFiles,
  uploadFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/getallfiles/:id", getAllFiles);
router.delete("/deletefile/:id", deleteFile);
export default router;
