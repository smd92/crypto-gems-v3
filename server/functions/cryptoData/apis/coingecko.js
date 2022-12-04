import CoinGecko from "coingecko-api";
const CoinGeckoClient = new CoinGecko();
import axios from "axios";

//obtain all the coins’ id in order to make API calls
async function getCoinList() {
  try {
    const response = await CoinGeckoClient.coins.list();
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

function getIDFromCoinlist(coinlist, coinName, coinSymbol) {
  const filtered = coinlist.filter((listItem) => {
    return (
      listItem.name.toLowerCase() === coinName.toLowerCase() &&
      listItem.symbol.toLowerCase() === coinSymbol.toLowerCase()
    );
  });

  const coingeckoID = filtered[0].id;
  return coingeckoID;
}

//get current data for a coin
async function getCoinByID(id, settings = {}) {
  try {
    const response = await CoinGeckoClient.coins.fetch(id, settings);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

//get top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
async function getTrendingCoins() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
}

export { getCoinList, getIDFromCoinlist, getCoinByID, getTrendingCoins };
