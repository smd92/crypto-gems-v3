import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  dexGems_getDexGemsByTimespan,
  dexGems_getDexGemsByDate,
  dexGems_getLatestDexGems,
  dexGems_deleteTokenById,
} from "../controllers/dexGemsController.js";

const router = express.Router();

/* READ */
router.get("/timespan", verifyToken, dexGems_getDexGemsByTimespan);
router.get("/latest", verifyToken, dexGems_getLatestDexGems);
router.get("/date/:date", verifyToken, dexGems_getDexGemsByDate);

/* DELETE */
router.delete("/:id", verifyToken, dexGems_deleteTokenById);

export default router;
