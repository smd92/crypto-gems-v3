import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = (numberOfGems) => {
  const lightbulbEmoji = String.fromCodePoint(0x1f4a1); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${lightbulbEmoji} Gems Followup: Top 5 Performers`;
  const subheading = `${threadEmoji} Of today's ${numberOfGems} #crypto #gems ${gemEmoji}, these are the top 5 performers of the last 24h:`;

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
  const counterEmoji = String.fromCodePoint(0x1f538);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    let priceChangePct; // add "+" sign, if price change pct is greater than 0
    if (obj.price_change_percentage_24h >= 0) {
      priceChangePct = "+" + obj.price_change_percentage_24h;
    } else if (obj.price_change_percentage_24h < 0) {
      priceChangePct = obj.price_change_percentage_24h;
    }

    const item = `${counterEmoji} ${symbol} ${obj.name} ${priceChangePct}%\n`;

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

const tweetPriceGainers24hTop5 = async (data, numberOfGems) => {
  try {
    const client = createClient();
    const thread = _createThread(data, numberOfGems);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("priceGainers24hTop5.js: " + err.message);
  }
};

export { tweetPriceGainers24hTop5 };
