import { createClient, createTestClient } from "../config.js";

const _buildTweet = (nftOfTheDay) => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8); //code point from https://emojipedia.org/de/emoji/
  const rocketEmoji = String.fromCodePoint(0x1f680);

  const heading = `${sirenEmoji} LunarCrush's NFT of the Day`;
  const lunarCrushInfo = `LunarCrush's NFT of the Day is selected based on the collection with the highest combination of NFT Score™ and AltRank™`;
  const hashtags = "#crypto #nft #bitcoin #ethereum";

  const tweet = `${heading}\n\n${nftOfTheDay.name} ${rocketEmoji}\n\n${lunarCrushInfo}\n\n${hashtags}`;
  return tweet;
};

export async function tweetLunarCrushNftOfTheDay(nftOfTheDay) {
  try {
    const client = createClient();
    const tweet = _buildTweet(nftOfTheDay);
    await client.v1.tweet(tweet);
  } catch (err) {
    console.log("twitter_lunarCrush_nftOfTheDay.js: " + err.message);
  }
}
