import { listingsLatest } from "./cmc.js";
import { getCoinList, getCoinByID } from "./coingecko.js";
import { getIDsFromCGList, getUnmatchedCoins } from "./filterHelpers.js";
import {
  filterByMarketCap,
  filterByVolume,
  filterByVolumeTrustScore,
} from "./filters.js";

const _trimGemData = (filteredByVolumeTrustScore) => {
  //remove null
  const filteredNoNull = filteredByVolumeTrustScore.filter((obj) => {
    if (obj !== null) return obj;
  });

  //remove fan tokens
  const filteredNoFanTokens = filteredNoNull.filter((obj) => {
    if (!/fan token/i.test(obj.name)) return obj;
  });

  const gems = filteredNoFanTokens.map((obj) => {
    return {
      coingecko_id: obj.id,
      name: obj.name,
      symbol: obj.symbol,
      platforms: obj.platforms,
      marketcap: {
        usd: obj.market_data.market_cap.usd,
        btc: obj.market_data.market_cap.btc,
      },
      currentPrice_usd: obj.market_data.current_price.usd,
      price_change_percentage_24h: obj.market_data.price_change_percentage_24h,
      price_change_percentage_7d: obj.market_data.price_change_percentage_7d,
      price_change_percentage_14d: obj.market_data.price_change_percentage_14d,
      price_change_percentage_30d: obj.market_data.price_change_percentage_30d,
      price_change_percentage_60d: obj.market_data.price_change_percentage_60d,
      price_change_percentage_200d:
        obj.market_data.price_change_percentage_200d,
      price_change_percentage_1y: obj.market_data.price_change_percentage_1y,
      supply: {
        circulating_supply: obj.market_data.circulating_supply,
        max_supply: obj.market_data.max_supply,
        total_supply: obj.market_data.total_supply,
      },
      total_value_locked: obj.market_data.total_value_locked,
      mcap_to_tvl_ratio: obj.market_data.mcap_to_tvl_ratio,
      links: {
        homepage: obj.links.homepage,
        repos: obj.links.repos_url,
      },
      ath: {
        usd: obj.market_data.ath.usd,
        btc: obj.market_data.ath.btc,
      },
      ath_change_percentage: {
        usd: obj.market_data.ath_change_percentage.usd,
        btc: obj.market_data.ath_change_percentage.btc,
      },
      atl: {
        usd: obj.market_data.atl.usd,
        btc: obj.market_data.atl.btc,
      },
      atl_change_percentage: {
        usd: obj.market_data.atl_change_percentage.usd,
        btc: obj.market_data.atl_change_percentage.btc,
      },
      developer_data: obj.developer_data,
      contract_address: obj.contract_address,
      coingecko_score: obj.coingecko_score,
      developer_score: obj.developer_score,
      community_score: obj.community_score,
      liquidity_score: obj.liquidity_score,
      public_interest_score: obj.public_interest_score,
      img: obj.image,
    };
  });

  return gems;
};

const _sortGemsByMarketCap = (gems) => {
  //sort by marketcap (usd) from highest to lowest
  gems.sort((a, b) => {
    if (a.marketcap.usd > b.marketcap.usd) return -1;
    if (a.marketcap.usd < b.marketcap.usd) return 1;
    if (a.marketcap.usd === b.marketcap.usd) return 0;
  });

  return gems;
};

const getGemsList = async (minMarketCap, maxMarketCap) => {
  try {
    //get data from CMC
    const dataCMC = await listingsLatest();
    //get data from CoinGecko
    const coinListCG = await getCoinList();
    //filter data
    const filteredByMarketCap = filterByMarketCap(
      dataCMC,
      minMarketCap,
      maxMarketCap
    );
    const filteredByVolume = filterByVolume(filteredByMarketCap);

    //get coins from coingecko
    const coingeckoIDs = getIDsFromCGList(filteredByVolume, coinListCG.data);
    const coinsCG = [];
    const sleep = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    for (let i = 0; i < coingeckoIDs.length; i++) {
      try {
        const response = await getCoinByID(coingeckoIDs[i]);
        coinsCG.push(response.data);
        console.log(`${i} of ${coingeckoIDs.length} done`);
        //delay calls to coingecko
        await sleep(5000);
      } catch (err) {
        console.log(err.message);
      }
    }

    //filter coins from coingecko by volume trustscore
    const filteredByVolumeTrustScore = await filterByVolumeTrustScore(coinsCG);
    //trim data
    const gems = _trimGemData(filteredByVolumeTrustScore);
    //sort by MCap
    const gemsSortedByMC = _sortGemsByMarketCap(gems);

    const unmatched = getUnmatchedCoins(filteredByVolume, coinsCG);
    const timestamp = new Date();

    return {
      gems: gemsSortedByMC,
      unmatched,
      timestamp,
      minMarketCap,
      maxMarketCap,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getGemsList };