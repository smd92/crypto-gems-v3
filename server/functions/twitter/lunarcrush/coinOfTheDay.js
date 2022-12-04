import { createClient, createTestClient } from "../config.js";

const _buildTweet = (coindata) => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8); //code point from https://emojipedia.org/de/emoji/
  const rocketEmoji = String.fromCodePoint(0x1f680);

  const heading = `${sirenEmoji} LunarCrush's Coin of the Day`;
  const coinInfo = `$${coindata.symbol.toUpperCase()} ${
    coindata.name
  } ${rocketEmoji}`;
  const lunarCrushInfo = `LunarCrush's Coin of the Day is the coin with the highest combination of Galaxy Score™ and AltRank™`;
  const hashtags = "#crypto #nft #bitcoin #ethereum";

  const tweet =
    heading +
    "\n" +
    "\n" +
    coinInfo +
    "\n" +
    "\n" +
    lunarCrushInfo +
    "\n" +
    "\n" +
    hashtags;
  return tweet;
};

export async function tweetLunarCrushCoinfOfTheDay(coinOfTheDay) {
  try {
    const client = createClient();
    const tweet = _buildTweet(coinOfTheDay);
    await client.v1.tweet(tweet);
  } catch (err) {
    console.log("twitter_lunarCrush_CoinOfTheDay.js: " + err.message);
  }
}
