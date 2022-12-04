import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfGems) => {
  const lightbulbEmoji = String.fromCodePoint(0x1f4a1); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${lightbulbEmoji} Gems Followup: Circulating vs Total Supply`;
  const intro =
    "Greater % of total supply in circulation means less risk of dilution and price drops!";
  const subheading1 = `${threadEmoji} Of today's ${numberOfGems} #gems ${gemEmoji}, these have the best circulating to total supply ratios.`;
  const subheading2 = "Sorted by % of total supply in circulation:";

  const tweetHeader =
    heading +
    "\n" +
    "\n" +
    intro +
    "\n" +
    "\n" +
    subheading1 +
    "\n" +
    "\n" +
    subheading2;
  return tweetHeader;
};

const _createThread = (data, numberOfGems) => {
  //start with empty thread
  let threadArr = [];
  //start with empty first tweet
  let tweetArr = [];
  //push tweet header into first tweet
  tweetArr.push(_createTweetHeader(numberOfGems));
  //emoji(s)
  const counterEmoji = String.fromCodePoint(0x1f538);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = `${counterEmoji} ${symbol} ${obj.name} ${obj.supplyRatio}%\n`;

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

const tweetSupplyRatio = async (data, numberOfGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter_supplyRatio.js: " + err.message);
  }
};

export { tweetSupplyRatio };
