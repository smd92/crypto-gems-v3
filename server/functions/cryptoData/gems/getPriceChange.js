import { getCoinByID } from "../apis/coingecko.js";

const getPriceChange24h = async (coin) => {
  try {
    const currentCoinData = await getCoinByID(coin.coingecko_id, {
      tickers: false,
      community_data: false,
      developer_data: false,
    });
    return currentCoinData.data.market_data.price_change_percentage_24h;
  } catch (err) {
    console.log(err.message);
  }
};

const getPriceChange7d = async (coin) => {
  try {
    const currentCoinData = await getCoinByID(coin.coingecko_id, {
      tickers: false,
      community_data: false,
      developer_data: false,
    });
    return currentCoinData.data.market_data.price_change_percentage_7d;
  } catch (err) {
    console.log(err.message);
  }
};

const getPriceChange30d = async (coin) => {
  try {
    const currentCoinData = await getCoinByID(coin.coingecko_id, {
      tickers: false,
      community_data: false,
      developer_data: false,
    });
    return currentCoinData.data.market_data.price_change_percentage_30d;
  } catch (err) {
    console.log(err.message);
  }
};

const getPriceChange60d = async (coin) => {
  try {
    const currentCoinData = await getCoinByID(coin.coingecko_id, {
      tickers: false,
      community_data: false,
      developer_data: false,
    });
    return currentCoinData.data.market_data.price_change_percentage_60d;
  } catch (err) {
    console.log(err.message);
  }
};

export {
  getPriceChange24h,
  getPriceChange7d,
  getPriceChange30d,
  getPriceChange60d,
};
