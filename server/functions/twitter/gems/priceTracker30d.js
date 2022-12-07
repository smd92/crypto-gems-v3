import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfGems) => {
  const lightbulbEmoji = String.fromCodePoint(0x1f4a1); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${lightbulbEmoji} Gems Followup: 30d Strength`;
  const subheading = `${threadEmoji} 30 days ago we identified ${numberOfGems} #crypto #gems ${gemEmoji} of which the following have since made notable price increases:`;

  const tweetHeader = heading + "\n" + "\n" + subheading + "\n";
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
  const rocketEmoji = String.fromCodePoint(0x1f680);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = `${symbol} ${obj.name} +${obj.price_change_percentage_30d}% ${rocketEmoji}\n`;

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

const tweetGainers30d = async (data, numberOfGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("priceTracker30d.js: " + err.message);
  }
};

export { tweetGainers30d };
