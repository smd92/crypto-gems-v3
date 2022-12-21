import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  portfolioToken_createPortfolioToken,
  portfolioToken_getPortfolioTokens,
  portfolioToken_getPortfolioTokenById,
  portfolioToken_updatePortfolioTokenById,
  portfolioToken_deletePortfolioTokenById,
} from "../controllers/portfolioTokenController.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, portfolioToken_createPortfolioToken);

/* READ */
router.get("/", verifyToken, portfolioToken_getPortfolioTokens);
router.get("/:id", verifyToken, portfolioToken_getPortfolioTokenById);

/* UPDATE */
router.patch("/:id", verifyToken, portfolioToken_updatePortfolioTokenById);

/* DELETE */
router.delete("/:id", verifyToken, portfolioToken_deletePortfolioTokenById);

export default router;
