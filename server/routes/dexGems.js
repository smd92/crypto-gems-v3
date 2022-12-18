import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { dexGems_getLatestDexGems, dexGems_deleteTokenById } from "../controllers/dexGemsController.js";

const router = express.Router();

/* READ */
router.get("/latest", verifyToken, dexGems_getLatestDexGems)

/* DELETE */
router.delete("/:id", verifyToken, dexGems_deleteTokenById)

export default router;