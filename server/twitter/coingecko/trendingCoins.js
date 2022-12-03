import { createClient, createTestClient } from "./twitter_config.js";

const tweetCoingeckoTrending = async (data) => {
  try {
    //emoji
    const sirenEmoji = String.fromCodePoint(0x1f6a8);

    const heading = `${sirenEmoji} CoinGecko Top 7 most searched for coins of the last 24 hours`;
    const body = data.coins
      .map((coin, index) => {
        return `${index + 1}. $${coin.item.symbol}\n`;
      })
      .join("");
    const hashtags = "#crypto";
    const attribution = "Powered by CoinGecko";

    const tweet =
      heading +
      "\n" +
      "\n" +
      body +
      "\n" +
      "\n" +
      hashtags +
      "\n" +
      "\n" +
      attribution;

    const client = createClient();
    const mediaId = await client.v1.uploadMedia(
      "server/img/coingeckoTrending.png"
    );
    await client.v1.tweet(tweet, { media_ids: mediaId });
  } catch (err) {
    console.log(err.message);
  }
};

export { tweetCoingeckoTrending };
