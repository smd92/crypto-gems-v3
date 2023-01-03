import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfDexGems) => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8); //code point from https://emojipedia.org/de/emoji/
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${sirenEmoji} MicroCaps: 24h Holders Change!`;
  const subheading1 = `Yesterday we filtered ${numberOfDexGems} potentially interesting MicroCaps.`;
  const subheading2 = `${threadEmoji} Change in number of holders (percent) since then:`;

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
  const counterEmoji = String.fromCodePoint(0x1f539);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //add plus sign if value > 0
    if (obj.holdersCountChangePct24h >= 0)
      obj.holdersCountChangePct24h = `+${obj.holdersCountChangePct24h}`;
    //create item that consists of emoji, symbol and name
    const item = `${counterEmoji} ${symbol} ${obj.name} ${obj.holdersCountChangePct24h}%\n`;

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

const tweetHoldersCountChange24h = async (data, numberOfDexGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfDexGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter_dexGems_holdersTracker24h.js: " + err.message);
  }
};

export { tweetHoldersCountChange24h };
