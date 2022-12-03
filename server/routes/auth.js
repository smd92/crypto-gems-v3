import express from "express";
import { login, register } from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", verifyToken, register);

router.post("/login", login);

export default router;
