import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfDexGems) => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8); //code point from https://emojipedia.org/de/emoji/
  const unicornEmoji = String.fromCodePoint(0x1f984);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${sirenEmoji} 24h MicroCap Strength!`;
  const subheading1 = `Yesterday we filtered ${numberOfDexGems} potentially interesting MicroCaps, of which the following already surged by 10% or more! (Data from Uniswap ${unicornEmoji})`;
  const subheading2 = `${threadEmoji} Price increase since then:`;

  const tweetHeader =
    heading + "\n" + "\n" + subheading1 + "\n" + "\n" + subheading2 + "\n";
  return tweetHeader;
};

const _createThread = (data, numberOfDexGems) => {
  //start with empty thread
  let threadArr = [];
  //start with empty first tweet
  let tweetArr = [];
  //push tweet header into first tweet
  tweetArr.push(_createTweetHeader(numberOfDexGems));
  //emoji(s)
  const rocketEmoji = String.fromCodePoint(0x1f680);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = `${symbol} ${obj.name} +${obj.priceChangePct}% ${rocketEmoji}\n`;

    //fit item into tweet into thread
    const threadState = threadHelper({
      data,
      obj,
      threadArr,
      tweetArr,
      item,
    });
    threadArr = threadState.threadArr;
    tweetArr = threadState.tweetArr;
  });

  return threadArr;
};

const tweetDexGemsGainers24h = async (data, numberOfDexGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfDexGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter_dexGems_24h.js: " + err.message);
  }
};

export { tweetDexGemsGainers24h };
