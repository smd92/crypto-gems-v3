import { TwitterApi } from "twitter-api-v2";

const createClient = () => {
  //OAuth 1.0a User context
  const client = new TwitterApi({
    appKey: process.env.TWITTER_BOT_API_KEY,
    appSecret: process.env.TWITTER_BOT_API_SECRET_KEY,
    accessToken: process.env.TWITTER_BOT_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_BOT_ACCESS_TOKEN_SECRET,
  });
  return client;
};

const createTestClient = () => {
  //OAuth 1.0a User context
  const client = new TwitterApi({
    appKey: process.env.TWITTER_SMD_API_KEY,
    appSecret: process.env.TWITTER_SMD_API_SECRET_KEY,
    accessToken: process.env.TWITTER_SMD_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_SMD_ACCESS_TOKEN_SECRET,
  });
  return client;
};

const testTweet = async () => {
  const client = createTestClient();
  const mediaId = await client.v1.uploadMedia(
    "server/img/GemCrawler_gemInfo_1600x900.png"
  );

  await client.v1.tweetThread([
    "Hello, lets talk about Twitter!",
    {
      status: "Twitter is a fantastic social network. Look at this:",
      media_ids: mediaId,
    },
    "This thread is automatically made with twitter-api-v2 :D",
  ]);
};

export { createClient, createTestClient, testTweet };
