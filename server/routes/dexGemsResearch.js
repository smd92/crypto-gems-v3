import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  dexGemsResearch_createDexGemsResearch,
  dexGemsResearch_getDexGemsResearch,
  dexGemsResearch_getDexGemsResearchById,
  dexGemsResearch_updateDexGemsResearchById,
  dexGemsResearch_deleteDexGemsResearchById,
} from "../controllers/dexGemsResearchController.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, dexGemsResearch_createDexGemsResearch);

/* READ */
router.get("/", verifyToken, dexGemsResearch_getDexGemsResearch);
router.get("/:id", verifyToken, dexGemsResearch_getDexGemsResearchById);

/* UPDATE */
router.patch("/:id", verifyToken, dexGemsResearch_updateDexGemsResearchById);

/* DELETE */
router.delete("/:id", verifyToken, dexGemsResearch_deleteDexGemsResearchById);

export default router;
