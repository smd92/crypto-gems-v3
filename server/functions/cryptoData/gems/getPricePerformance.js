import {
  getPriceChange24h,
  getPriceChange7d,
  getPriceChange30d,
  getPriceChange60d,
} from "./priceChange.js";

const sortByPriceChange = (coins, priceChangeKey) => {
  //sort by price change percentage from highest to lowest
  coins.sort((a, b) => {
    if (a[priceChangeKey] > b[priceChangeKey]) return -1;
    if (a[priceChangeKey] < b[priceChangeKey]) return 1;
    if (a[priceChangeKey] === b[priceChangeKey]) return 0;
  });

  return coins;
};

const _removeOutliers = (values) => {
  //remove outliers
  values.sort(function (a, b) {
    return a - b;
  });
  /* Then find a generous IQR. This is generous because if (values.length / 4)
   * is not an int, then really you should average the two elements on either
   * side to find q1.
   */
  const q1 = values[Math.floor(values.length / 4)];
  // Likewise for q3.
  const q3 = values[Math.ceil(values.length * (3 / 4))];
  const iqr = q3 - q1;
  // Then find min and max values
  const maxValue = q3 + iqr * 1.5;
  const minValue = q1 - iqr * 1.5;
  // Then filter anything beyond or beneath these values.
  const noOutliers = values.filter(function (x) {
    return x <= maxValue && x >= minValue;
  });

  return noOutliers;
};

const getPerformance24h = async (coins) => {
  try {
    const sleep = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    //map price change to coin
    const priceChangeMapped = [];
    for (let i = 0; i < coins.length; i++) {
      const price_change_percentage_24h = await getPriceChange24h(coins[i]);
      priceChangeMapped.push({
        ...coins[i],
        price_change_percentage_24h,
      });
      console.log(`${i + 1} of ${coins.length} done`);
      //delay calls to coingecko
      await sleep(5000);
    }

    const sortedByPriceChange = sortByPriceChange(
      priceChangeMapped,
      "price_change_percentage_24h"
    );

    return sortedByPriceChange;
  } catch (err) {
    console.log(err.message);
  }
};

const getPerformance7d = async (coins) => {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  //map price change to coin
  const priceChangeMapped = [];
  for (let i = 0; i < coins.length; i++) {
    const price_change_percentage_7d = await getPriceChange7d(coins[i]);
    priceChangeMapped.push({
      ...coins[i],
      price_change_percentage_7d,
    });
    console.log(`${i + 1} of ${coins.length} done`);
    //delay calls to coingecko
    await sleep(5000);
  }

  const sortedByPriceChange = sortByPriceChange(
    priceChangeMapped,
    "price_change_percentage_7d"
  );

  return sortedByPriceChange;
};

const getPerformance30d = async (coins) => {
  try {
    const sleep = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    //map price change to coin
    const priceChangeMapped = [];
    for (let i = 0; i < coins.length; i++) {
      const price_change_percentage_30d = await getPriceChange30d(coins[i]);
      priceChangeMapped.push({
        ...coins[i],
        price_change_percentage_30d,
      });
      console.log(`${i + 1} of ${coins.length} done`);
      //delay calls to coingecko if rateLimit is exceeded
      await sleep(5000);
    }

    const sortedByPriceChange = sortByPriceChange(
      priceChangeMapped,
      "price_change_percentage_30d"
    );

    return sortedByPriceChange;
  } catch (err) {
    console.log(err.message);
  }
};

const getPerformance60d = async (coins) => {
  try {
    const rateLimit = 50; //according to coingecko docs
    const sleep = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    //map price change to coin
    const priceChangeMapped = [];
    for (let i = 0; i < coins.length; i++) {
      const price_change_percentage_60d = await getPriceChange60d(coins[i]);
      priceChangeMapped.push({
        ...coins[i],
        price_change_percentage_60d,
      });
      console.log(`${i + 1} of ${coins.length} done`);
      //delay calls to coingecko if rateLimit is exceeded
      if (coins.length > rateLimit) await sleep(5000);
    }

    const sortedByPriceChange = sortByPriceChange(
      priceChangeMapped,
      "price_change_percentage_60d"
    );

    return sortedByPriceChange;
  } catch (err) {
    console.log(err.message);
  }
};

const getAveragePerformance = (coins, key) => {
  const values = [];
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    const priceChange = coin[key];
    values.push(priceChange);
  }

  const noOutliers = _removeOutliers(values);

  //get average
  const sum = noOutliers.reduce((acc, val) => acc + val);
  const avg = sum / noOutliers.length;
  return avg;
};

export {
  getPerformance24h,
  getPerformance7d,
  getPerformance30d,
  getPerformance60d,
  getAveragePerformance,
  sortByPriceChange,
};
