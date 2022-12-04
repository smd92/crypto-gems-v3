import { createClient, createTestClient } from "../config.js";

const _buildTweet = (number) => {
  const smilingEmoji = String.fromCodePoint(0x1f60a); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);
  const dollarFaceEmoji = String.fromCodePoint(0x1f911);
  const eyesEmoji = String.fromCodePoint(0x1f440);

  const heading = `GM everybody ${smilingEmoji}`;
  const subheading = `Today we identified ${number} potential #crypto #gems ${gemEmoji}`;
  const mCapRange = `Marketcap between $1m and $10m ${dollarFaceEmoji}`;
  const stayTuned = `Stay tuned for further data ${eyesEmoji}`;
  const hashtags = "#crypto #nft #bitcoin #ethereum";

  const tweet =
    heading +
    "\n" +
    "\n" +
    subheading +
    "\n" +
    mCapRange +
    "\n" +
    "\n" +
    stayTuned +
    "\n" +
    hashtags;
  return tweet;
};

export async function tweetNumberOfGems(number) {
  try {
    const client = createClient();
    const tweet = _buildTweet(number);
    await client.v1.tweet(tweet);
  } catch (err) {
    console.log("twitter_numberOfGems.js: " + err.message);
  }
}
