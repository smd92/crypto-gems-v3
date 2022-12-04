import { schedule } from "node-cron";
/* CRYPTO DATA */
import { getTrendingCoins } from "./functions/cryptoData/apis/coingecko.js";
import { getLunarCrushData } from "./functions/cryptoData/apis/lunarCrush.js";
/* DB */
import { coingeckoTrending24hCreate } from "./db/coingeckoTrending24h.js";
/* GRAPHICS */
import {
  createCGTrendingChart,
  saveCGTrendingChart,
} from "./functions/graphics/coingeckoTrending/coingeckoTrending.js";
/* TWITTER */
import { tweetCoingeckoTrending } from "./functions/twitter/coingecko/trendingCoins.js";
import { tweetLunarCrushCoinfOfTheDay } from "./functions/twitter/lunarcrush/coinOfTheDay.js";

schedule("54 12 * * *", async function cron_trendingCoins() {
  try {
    //get data
    const data = await getTrendingCoins();
    if (data.coins.length < 7) {
      return console.log("somethings wrong with the trending coins array");
    } else if (data.coins.length > 7) {
      //in case CoinGecko returns more than 7 trending coins
      const diff = data.coins.length - 7;
      data.coins.splice(7, diff);
    }
    // get chart
    const chart = createCGTrendingChart(data.coins);
    await saveCGTrendingChart(chart);
    //save data to db
    await coingeckoTrending24hCreate(data);
    //tweet data
    await tweetCoingeckoTrending(data);
    console.log("successfully tweeted coingecko trending coins");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 9 * * *", async function cron_lunarCrushCoinfOfTheDay() {
  try {
    //get coin of the day
    const response = await getLunarCrushData(
      "https://lunarcrush.com/api3/coinoftheday"
    );
    if (response.status !== 200)
      return console.log(
        `LunarCrush Error: ${response.status} ${response.statusText}`
      );
    const coinOfTheDay = response.data;
    console.log(coinOfTheDay);
    //tweet data
    await tweetLunarCrushCoinfOfTheDay(coinOfTheDay);
    console.log("successfully tweeted lunarcrush coin of the day");
  } catch (err) {
    console.log(err.message);
  }
});
