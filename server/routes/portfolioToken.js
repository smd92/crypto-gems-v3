import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  portfolioToken_createPortfolioToken,
  portfolioToken_getPortfolioTokens,
} from "../controllers/portfolioTokenController.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, portfolioToken_createPortfolioToken);

/* READ */
router.get("/", verifyToken, portfolioToken_getPortfolioTokens);

export default router;
