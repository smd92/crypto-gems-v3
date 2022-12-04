import { createClient, createTestClient } from "./twitter_config.js";
import { threadHelper } from "./twitter_helperFunctions.js";

const _createTweetHeader = (numberOfTokens) => {
  const sirenEmoji = String.fromCodePoint(0x1f6a8);
  const lightbulbEmoji = String.fromCodePoint(0x1f4a1); //code point from https://emojipedia.org/de/emoji/
  const unicornEmoji = String.fromCodePoint(0x1f984);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `${sirenEmoji} MicroCap Alpha: Uniswap Latest Launches`;
  const subHeading1 = `Today we filtered ${numberOfTokens} potential degen plays`;
  const subHeading2 = `${lightbulbEmoji} How we did it:\n1. Fetch all Uniswap ${unicornEmoji} listings of the last 10-14 days\n2. Filter by several parameters, get rid of worst trash\n3. Get manageable list of tokens for research`;

  const tweetHeader =
    heading +
    "\n" +
    "\n" +
    subHeading1 +
    "\n" +
    "\n" +
    subHeading2 +
    "\n" +
    "\n" +
    `${threadEmoji} Full list:` +
    "\n";
  return tweetHeader;
};

const _createThread = (data) => {
  //start with empty thread
  let threadArr = [];
  //start with empty first tweet
  let tweetArr = [];
  //push tweet header into first tweet
  const tweetHeader = _createTweetHeader(data.length);
  tweetArr.push(tweetHeader);
  //emoji(s)
  const fireEmoji = String.fromCodePoint(0x1f525);

  data.forEach((obj) => {
    //get symbols with dollar sign to make clickable on twitter
    const symbol = "$" + obj.symbol.toUpperCase();
    //create item that consists of emoji, symbol and name
    const item = fireEmoji + " " + symbol + " " + obj.name + "\n";

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

const tweetUniLatestLaunches = async (data) => {
  try {
    const client = createClient();
    const thread = _createThread(data);

    //add info graphic to first tweet of thread
    const mediaId = await client.v1.uploadMedia(
      "server/img/GemCrawler_uniswapV2Info_1600x900.png"
    );
    const firstTweetOfThread = thread[0];
    thread[0] = {
      status: firstTweetOfThread,
      media_ids: mediaId,
    };

    await client.v1.tweetThread(thread);
  } catch (err) {
    console.log(err.message);
  }
};

export { tweetUniLatestLaunches };
