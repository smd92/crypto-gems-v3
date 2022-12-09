import { getTokenPriceUSD, getPairByID } from "../apis/uniswapV2.js";

export const getPriceChange = async (dexGems) => {
  //get WETH price to calculate USD price of token0
  const priceWETH = await getTokenPriceUSD(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  );

  const mappedPriceChange = [];
  for (let i = 0; i < dexGems.length; i++) {
    const pair = await getPairByID(dexGems[i].pairAdress); //get current pair data
    if (pair) {
      const nativePrice = Number(pair.token0Price);
      const latestPriceUSD = Number(priceWETH) / nativePrice;
      dexGems[i].latestPriceUSD = latestPriceUSD;
      dexGems[i].priceChangePct =
        Math.round(
          ((latestPriceUSD / dexGems[i].priceUSD - 1) * 100 + Number.EPSILON) *
            100
        ) / 100; //map priceChange
      mappedPriceChange.push(dexGems[i]);
    }
  }
  const sorted = mappedPriceChange.sort((a, b) => {
    if (a.priceChangePct > b.priceChangePct) return -1;
    if (a.priceChangePct < b.priceChangePct) return 1;
    if (a.priceChangePct === b.priceChangePct) return 0;
  });
  return sorted;
};
