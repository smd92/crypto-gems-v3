const filterByPriceChange = (coins, priceChangeKey, threshold) => {
  const filtered = coins.filter((coin) => {
    return coin[priceChangeKey] >= threshold;
  });
  return filtered;
};

const filterBySupplyRatio = (coins, threshold) => {
  const filtered = coins.filter((coin) => {
    return (
      coin.supply.circulating_supply / coin.supply.total_supply >= threshold
    );
  });
  return filtered;
};

const filterByMaxSupply = (coins) => {
  const filtered = coins.filter((coin) => {
    return Number(coin.supply.max_supply) !== 0;
  });
  return filtered;
};

const filterByDeveloperScore = (coins, threshold) => {
  const filtered = coins.filter((coin) => {
    return coin.developer_score > threshold;
  });
  return filtered;
};

export {
  filterByPriceChange,
  filterBySupplyRatio,
  filterByMaxSupply,
  filterByDeveloperScore,
};
