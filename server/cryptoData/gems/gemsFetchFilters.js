import { getTickers, getVolumesFromTickers } from "./filterHelpers.js";

//filter CMC data by market cap
const filterByMarketCap = (dataCMC, minCap, maxCap) => {
  if (dataCMC) {
    const filtered = dataCMC.filter((obj) => {
      return (
        obj.quote.USD.market_cap < maxCap && obj.quote.USD.market_cap > minCap
      );
    });
    return filtered;
  } else if (err) {
    console.log(err.message);
  }
};

//filter CMC data by volume
const filterByVolume = (dataCMC) => {
  if (dataCMC) {
    const filtered = dataCMC.filter((obj) => {
      return (
        obj.quote.USD.volume_24h / obj.quote.USD.market_cap >= 0.1 &&
        obj.quote.USD.volume_24h / obj.quote.USD.market_cap <= 0.5
      );
    });
    return filtered;
  } else if (err) {
    console.log(err.message);
  }
};

//filter CMC data by trust score of volume using data from coingecko
const filterByVolumeTrustScore = async (coinsCG) => {
  //get tickers from coinsCG, keep name for later use
  const coinTickersCG = getTickers(coinsCG);

  //get volumes from tickers and only keep tickers where majority of volume comes from trustworthy sources
  const filtered = coinTickersCG.map((obj) => {
    const volumes = getVolumesFromTickers(obj);
    if (volumes.greenVolume / volumes.totalVolume >= 0.5) return obj;
  });

  return filtered;
};

export { filterByMarketCap, filterByVolume, filterByVolumeTrustScore };
