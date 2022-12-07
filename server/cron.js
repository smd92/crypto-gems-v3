import { schedule } from "node-cron";
/* CRYPTO DATA */
import { getTrendingCoins } from "./functions/cryptoData/apis/coingecko.js";
import { getLunarCrushData } from "./functions/cryptoData/apis/lunarCrush.js";
import {
  getPerformance24h,
  getPerformance30d,
  sortByPriceChange,
} from "./functions/cryptoData/gems/getPricePerformance.js";
import {
  filterByPriceChange,
  filterBySupplyRatio,
  filterByMaxSupply,
} from "./functions/cryptoData/gems/filterByMetrics.js";
import { getGemsList } from "./functions/cryptoData/gems/getGemsList.js";
/* DB */
import { coingeckoTrending24hCreate } from "./db/coingeckoTrending24h.js";
import { getSavedGemsDaysAgo, gemsCreate, getGemsByDate } from "./db/gems.js";
/* GRAPHICS */
import {
  createCGTrendingChart,
  saveCGTrendingChart,
} from "./functions/graphics/coingeckoTrending/coingeckoTrending.js";
/* TWITTER */
import { tweetCoingeckoTrending } from "./functions/twitter/coingecko/trendingCoins.js";
import { tweetLunarCrushCoinfOfTheDay } from "./functions/twitter/lunarcrush/coinOfTheDay.js";
import { tweetLunarCrushNftOfTheDay } from "./functions/twitter/lunarcrush/nftOfTheDay.js";
import { tweetGainers24h } from "./functions/twitter/gems/priceTracker24h.js";
import { tweetGainers30d } from "./functions/twitter/gems/priceTracker30d.js";
import { tweetNumberOfGems } from "./functions/twitter/gems/teaser.js";
import { tweetFullList } from "./functions/twitter/gems/fullList.js";
import { tweetSupplyRatio } from "./functions/twitter/gems/supplyRatio.js";
import { tweetPriceGainers24hTop5 } from "./functions/twitter/gems/priceGainers24hTop5.js";
import { tweetMaxSupply } from "./functions/twitter/gems/maxSupply.js";

schedule("0 8 * * *", async function cron_coingeckoTrending() {
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
    //tweet data
    await tweetLunarCrushCoinfOfTheDay(coinOfTheDay);
    console.log("successfully tweeted lunarcrush coin of the day");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("30 9 * * *", async function cron_lunarCrushNftOfTheDay() {
  try {
    //get nft of the day
    const response = await getLunarCrushData(
      "https://lunarcrush.com/api3/nftoftheday"
    );
    if (response.status !== 200)
      return console.log(
        `LunarCrush Error: ${response.status} ${response.statusText}`
      );
    const nftOfTheDay = response.data;
    //tweet data
    await tweetLunarCrushNftOfTheDay(nftOfTheDay);
    console.log("successfully tweeted lunarcrush NFT of the day");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 10 * * *", async function cron_gems_gainers24h() {
  try {
    //get yesterday's gems
    const data = await getSavedGemsDaysAgo(1);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //get strongest performers of last 24h
    const priceChangeUpdated = await getPerformance24h(gems);
    const gainers24h = filterByPriceChange(
      priceChangeUpdated,
      "price_change_percentage_24h",
      10
    );
    //stop process if there are no gainers
    if (gainers24h.length === 0)
      return console.log("seems like there are no gainers24h this time");
    //format data for tweet
    const gainers24hForTweet = gainers24h.map((gem) => {
      return {
        symbol: gem.symbol,
        name: gem.name,
        //round to two decimals
        price_change_percentage_24h:
          Math.round((gem.price_change_percentage_24h + Number.EPSILON) * 100) /
          100,
      };
    });
    //tweet data
    await tweetGainers24h(gainers24hForTweet);
    console.log("successfully tweeted gainers 24h");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 11 * * *", async function cron_gems_ultraLowCaps() {
  try {
    //get data
    const data = await getGemsList(1_000_000, 5_000_000);
    //save data to db
    await gemsCreate(data);
    console.log("ultra-lowcaps done");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("30 11 * * *", async function cron_gems_lowCaps() {
  try {
    //get data
    const data = await getGemsList(5_000_000, 10_000_000);
    //save data to db
    await gemsCreate(data);
    console.log("lowcaps done");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 12 * * *", async function cron_gems_gainers30d() {
  try {
    //get date of 30 days ago
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    //get gems of 30 days ago
    const data = await getGemsByDate(thirtyDaysAgo);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //get strongest performers of last 30d
    const priceChangeUpdated = await getPerformance30d(gems);
    const gainers30d = filterByPriceChange(
      priceChangeUpdated,
      "price_change_percentage_30d",
      20
    );
    //stop process if there are no gainers
    if (gainers30d.length === 0) return "no gems gainers 30d found";
    //format data for tweet
    const gainers30dForTweet = gainers30d.map((gem) => {
      return {
        symbol: gem.symbol,
        name: gem.name,
        //round to two decimals
        price_change_percentage_30d:
          Math.round((gem.price_change_percentage_30d + Number.EPSILON) * 100) /
          100,
      };
    });
    //tweet data
    await tweetGainers30d(gainers30dForTweet, gems.length);
    console.log("successfully tweeted gainers30d");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 13 * * *", async function cron_gems_teaser() {
  try {
    const today = new Date();
    //get data
    const data = await getGemsByDate(today);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //stop process if there are no gems
    if (gems.length === 0) return;
    //tweet
    await tweetNumberOfGems(gems.length);
    console.log("successfully tweeted number of todays gems");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("30 13 * * *", async function cron_gems_fullList() {
  try {
    const today = new Date();
    //get data
    const data = await getGemsByDate(today);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //stop process if there are no gems
    if (gems.length === 0) return;
    await tweetFullList(gems);
    console.log("successfully tweeted full list of today's gems");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 14 * * *", async function cron_gems_supplyRatio() {
  try {
    const today = new Date();
    //get data
    const data = await getGemsByDate(today);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //stop process if there are no gems
    if (gems.length === 0) return;
    //only keep coins that have more than 50% of supply in circulation
    const filtered = filterBySupplyRatio(gems, 0.5);
    if (filtered.length === 0) return;
    //format data for tweet
    const dataForTweet = filtered
      .map((gem) => {
        const supplyRatio =
          (gem.supply.circulating_supply / gem.supply.total_supply) * 100;
        return {
          symbol: gem.symbol,
          name: gem.name,
          supplyRatio: Math.round((supplyRatio + Number.EPSILON) * 100) / 100,
        };
      })
      .filter((gem) => gem.supplyRatio <= 100) //remove >100
      .sort((a, b) => {
        // sort by ratio highest to lowest
        if (a.supplyRatio > b.supplyRatio) return -1;
        if (a.supplyRatio < b.supplyRatio) return 1;
        if (a.supplyRatio === b.supplyRatio) return 0;
      });
    //tweet data
    await tweetSupplyRatio(dataForTweet, gems.length);
    console.log("successfully tweeted gems supply ratio");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("0 15 * * *", async function cron_gems_priceGainers24hTop5() {
  try {
    const today = new Date();
    //get data
    const data = await getGemsByDate(today);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //stop process if there are no gems
    if (gems.length === 0) return;
    //sort by price change
    const sorted = sortByPriceChange(gems, "price_change_percentage_24h");
    //get top 5
    const top5 = [...sorted].splice(0, 5);
    //format data for tweet
    const top5ForTweet = top5.map((gem) => {
      return {
        symbol: gem.symbol,
        name: gem.name,
        //round to two decimals
        price_change_percentage_24h:
          Math.round((gem.price_change_percentage_24h + Number.EPSILON) * 100) /
          100,
      };
    });
    //tweet data
    await tweetPriceGainers24hTop5(top5ForTweet, gems.length);
    console.log("successfully tweeted top5 24h");
  } catch (err) {
    console.log(err.message);
  }
});

schedule("30 15 * * *", async function cron_gems_maxSupply() {
  try {
    const today = new Date();
    //get data
    const data = await getGemsByDate(today);
    const gems = [];
    data.forEach((document) => {
      //exclude ultra-low caps
      if (document.minMarketCap >= 1_000_000)
        document.gems.forEach((gem) => gems.push(gem));
    });
    //stop process if there are no gems
    if (gems.length === 0) return;
    //keep gems with max supply
    const maxSupplyGems = filterByMaxSupply(gems);
    //stop process if there are no gems with max supply
    if (maxSupplyGems.length === 0) return;
    //format data for tweet
    const gemsForTweet = maxSupplyGems.map((gem) => {
      return {
        symbol: gem.symbol,
        name: gem.name,
      };
    });
    //tweet data
    await tweetMaxSupply(gemsForTweet);
    console.log("successfully tweeted max supply gems");
  } catch (err) {
    console.log(err.message);
  }
});
