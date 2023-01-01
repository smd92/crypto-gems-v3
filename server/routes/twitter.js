import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { twitter_tweetDexGemsResearch } from "../controllers/twitterController.js";

const router = express.Router();

router.patch("/dexGemsResearch/:id", verifyToken, twitter_tweetDexGemsResearch);

export default router;
