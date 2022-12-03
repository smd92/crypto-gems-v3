import { createClient } from "./twitter_config.js";
import { threadHelper } from "./twitter_helperFunctions.js";

const _createTweetHeader = () => {
  const lightbulbEmoji = String.fromCodePoint(0x1f4a1); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);

  const heading = `${lightbulbEmoji} Gems Followup: Max. Supply`;
  const subheading1 = "Do you prefer deflationary token models?";
  const subheading2 = `Of today's #crypto #gems ${gemEmoji}, these are capped at a maximum supply:`;

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
  const counterEmoji = String.fromCodePoint(0x1f538);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter (cashtag)
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = `${counterEmoji} ${symbol} ${obj.name}\n`;

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

const tweetGemsMaxSupply = async (data) => {
  try {
    const client = createClient();
    const thread = _createThread(data);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("twitter_maxSupply.js: " + err.message);
  }
};

export { tweetGemsMaxSupply };
