import { getDexGemsResearchById } from "../db/dexGemsResearch.js";
import { tweetDexGemsResearch,  } from "../functions/twitter/dexGems/research.js";

/* Tweet data */
export const twitter_tweetDexGemsResearch = async (req, res) => {
    try {
        const data = await getDexGemsResearchById(req.params.id);
        await tweetDexGemsResearch(data);
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: err.message });
    }
  }