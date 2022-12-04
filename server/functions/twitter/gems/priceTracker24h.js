import { createClient, createTestClient } from "./twitter_config.js";
import { threadHelper } from "./twitter_helperFunctions.js";

const _createTweetHeader = () => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);

  const heading = `${sirenEmoji} 24h Price Update!`;
  const subheading1 = `Of yesterday's #crypto #gems ${gemEmoji}, these already surged by 10% or more!`;
  const subheading2 = "Price increase (last 24 hours):";

  const tweetHeader =
    heading + "\n" + "\n" + subheading1 + "\n" + "\n" + subheading2 + "\n";
  return tweetHeader;
};

const _createThread = (data) => {
  //start with empty thread
  let threadArr = [];
  //start with empty first tweet
  let tweetArr = [];
  //push tweet header into first tweet
  tweetArr.push(_createTweetHeader());
  //emoji(s)
  const rocketEmoji = String.fromCodePoint(0x1f680);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = `${symbol} ${obj.name} +${obj.price_change_percentage_24h}% ${rocketEmoji}\n`;

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

const tweetGainers24h = async (data) => {
  try {
    const client = createClient();
    const thread = _createThread(data);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter_gainers24h.js: " + err.message);
  }
};

export { tweetGainers24h };
