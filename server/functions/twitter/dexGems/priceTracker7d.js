import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfDexGems, data) => {
  const unicornEmoji = String.fromCodePoint(0x1f984);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const text1 = `7 days ago we called ${numberOfDexGems} MicroCaps trading on Uniswap ${unicornEmoji}\n\n`;
  const text2 = `Right now ${data.length} of those tokens are up in price over that 7d period, which makes them stand out!\n\n`;
  const text3 = `${threadEmoji} Tokens sorted by price change:`;

  const tweetHeader = text1 + text2 + text3;
  return tweetHeader;
};

const _createThread = (data, numberOfDexGems) => {
  //start with empty thread
  let threadArr = [];
  //start with empty first tweet
  let tweetArr = [];
  //push tweet header into first tweet
  tweetArr.push(_createTweetHeader(numberOfDexGems, data));
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

const tweetDexGemsGainers7d = async (data, numberOfDexGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfDexGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter/dexGems/priceTracker7d.js: " + err.message);
  }
};

export { tweetDexGemsGainers7d };
