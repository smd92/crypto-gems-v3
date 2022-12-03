import { getTokenPriceUSDV2, getPairByIDV2 } from "./uniswapV2.js";

export const getLiquidityChange = async (dexGems) => {
  //get WETH price to calculate USD price of token0
  const priceWETH = await getTokenPriceUSDV2(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  );

  const mappedLiquidityChange = [];
  for (let i = 0; i < dexGems.length; i++) {
    const pair = await getPairByIDV2(dexGems[i].pairAdress); //get current pair data
    if (pair) {
      const nativePrice = Number(pair.token0Price);
      const priceUSD = Number(priceWETH) / nativePrice;
      const totalLiqInTokens = Number(pair.token0.totalLiquidity);
      const todayLiquidity = priceUSD * totalLiqInTokens;

      const lastLiquidity = dexGems[i].totalLiquidityUSD;

      dexGems[i].liquidityChangePct =
        Math.round(
          ((todayLiquidity / lastLiquidity - 1) * 100 + Number.EPSILON) * 100
        ) / 100;

      mappedLiquidityChange.push(dexGems[i]);
    }
  }
  const sorted = mappedLiquidityChange.sort((a, b) => {
    if (a.liquidityChangePct > b.liquidityChangePct) return -1;
    if (a.liquidityChangePct < b.liquidityChangePct) return 1;
    if (a.liquidityChangePct === b.liquidityChangePct) return 0;
  });
  return sorted;
};
