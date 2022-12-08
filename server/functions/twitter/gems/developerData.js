import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = () => {
  const lightbulbEmoji = String.fromCodePoint(0x1f4a1); //code point from https://emojipedia.org/de/emoji/
  const gemEmoji = String.fromCodePoint(0x1f48e);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${lightbulbEmoji} Gems Followup: Development Activity`;
  const subheading1 =
    "Development activity is an important metric for evaluating coins/tokens!";
  const subheading2 = `${threadEmoji} Of today's #crypto #gems ${gemEmoji}, these have notable and verifiable development activity:`;

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

const tweetDeveloperData = async (data) => {
  try {
    const client = createClient();
    const thread = _createThread(data);
    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log("developerData.js: " + err.message);
  }
};

export { tweetDeveloperData };
