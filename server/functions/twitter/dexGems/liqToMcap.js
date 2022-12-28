import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfDexGems, data) => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8); //code point from https://emojipedia.org/de/emoji/
  const unicornEmoji = String.fromCodePoint(0x1f984);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const text0 = `${sirenEmoji} Today's MicroCaps: Liquidity to Marketcap!\n\n`;
  const text1 = `Today we filtered ${numberOfDexGems} MicroCaps trading on Uniswap ${unicornEmoji}\n\n`;
  const text2 = `${data.length} of those tokens have a liquidity-to-marketcap-ratio of 10-15%, indicating the potential to pump in price!\n\n`;
  const text3 = `${threadEmoji} Tokens sorted by liq-to-mcap-ratio:`;

  const tweetHeader = text0 + text1 + text2 + text3;
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
  const counterEmoji = String.fromCodePoint(0x1f539);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = `${counterEmoji} ${symbol} ${obj.name}: ${obj.liqToMcap}%\n`;

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

const tweetLiqToMcap = async (data, numberOfDexGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfDexGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter/dexGems/liqToMcap.js: " + err.message);
  }
};

export { tweetLiqToMcap };
