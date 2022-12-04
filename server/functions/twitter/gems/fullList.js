import { createClient, createTestClient } from "../config.js";
import { threadHelper } from "../helperFunctions.js";

const _createTweetHeader = () => {
  const gemEmoji = String.fromCodePoint(0x1f48e);
  const threadEmoji = String.fromCodePoint(0x1f9f5);

  const heading = `The full list of today's potential #crypto #gems ${gemEmoji}`;

  const tweetHeader =
    heading + "\n" + "\n" + `${threadEmoji} Full list:` + "\n";
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

const tweetGemList = async (data) => {
  try {
    const client = createClient();
    const thread = _createThread(data);

    //add info graphic to first tweet of thread
    const mediaId = await client.v1.uploadMedia(
      "server/img/GemCrawler_gemInfo_1600x900.png"
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

export { tweetGemList };
