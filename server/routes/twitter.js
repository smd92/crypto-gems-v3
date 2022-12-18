import express from "express";
import { verifyToken } from "../middleware/auth.js";
import router from "./dexGemsResearch.js";

const router = express.Router();

router.patch("/dexGemsResearch/:id", verifyToken);

export default router;
