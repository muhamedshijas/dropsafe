import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/login", login);
router.get("/check", checkAuth);
router.get("/logout", logout);

export default router;
