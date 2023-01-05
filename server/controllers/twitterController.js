import {
  getDexGemsResearchById,
  markResearchTweeted,
} from "../db/dexGemsResearch.js";
import { tweetDexGemsResearch } from "../functions/twitter/dexGems/research.js";

/* Tweet data */
export const twitter_tweetDexGemsResearch = async (req, res) => {
  try {
    const data = await getDexGemsResearchById(req.params.id);
    await tweetDexGemsResearch(data);
    await markResearchTweeted(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};
