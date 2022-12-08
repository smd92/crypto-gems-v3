import axios from "axios";

const uniswapV2 = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"; // https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2

//get latest pairs
const _latestPairsQuery = async (skip) => {
  try {
    const result = await axios.post(uniswapV2, {
      //https://thegraph.com/docs/en/querying/graphql-api/
      query: `
        query latestPairs($skip: Int!) {
          pairs(first: 1000, orderBy: createdAtTimestamp, orderDirection: desc, skip: $skip) {
            id
            token0 {
              id
              symbol
              name
              decimals
              totalSupply
              tradeVolume
              tradeVolumeUSD
              untrackedVolumeUSD
              txCount
              totalLiquidity
            }
            token1 {
              id
              symbol
              name
              decimals
              totalSupply
              tradeVolume
              tradeVolumeUSD
              untrackedVolumeUSD
              txCount
              totalLiquidity
            }
            reserve0
            reserve1
            reserveETH
            reserveUSD
            token0Price
            token1Price
            volumeToken0
            volumeToken1
            volumeUSD
            untrackedVolumeUSD
            txCount
            createdAtTimestamp
            createdAtBlockNumber
            liquidityProviderCount
          }
        }`,
      variables: { skip: skip },
    });

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

//get current price of token in USD
const _tokenPriceUSDquery = async (tokenID) => {
  try {
    const result = await axios.post(uniswapV2, {
      //https://thegraph.com/docs/en/querying/graphql-api/
      query: `
        query tokenPriceUSD($tokenID: String) {
          tokenDayDatas(first: 1, orderBy: date, orderDirection: desc,
            where: {
              token: $tokenID
            }
           ) {
              id
              date
              priceUSD
           }
        }`,
      variables: { tokenID: tokenID },
    });

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

//get current tokenDayData
const _tokenDayDataQuery = async (tokenID, dateUNIX) => {
  try {
    const result = await axios.post(uniswapV2, {
      //https://thegraph.com/docs/en/querying/graphql-api/
      query: `
        query tokenDayData($tokenID: String, $dateUNIX: Int!) {
          tokenDayDatas(first: 1, orderBy: date, orderDirection: desc,
            where: {
              token: $tokenID,
              date: $dateUNIX
            }
           ) {
              id
              date
              totalLiquidityUSD
              dailyVolumeUSD
              dailyTxns
              priceUSD
           }
        }`,
      variables: { tokenID: tokenID, dateUNIX: dateUNIX },
    });

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

//get current price of token in USD
const _pairQuery = async (pairID) => {
  try {
    const result = await axios.post(uniswapV2, {
      //https://thegraph.com/docs/en/querying/graphql-api/
      query: `
        query pairQuery($pairID: String) {
          pairs(where: { id: $pairID }) {
              id
              token0Price
              reserveUSD
              volumeUSD
              txCount
              token0 {
                totalLiquidity
              }
           }
        }`,
      variables: { pairID: pairID },
    });

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const getLatestPairs = async () => {
  try {
    let pairsArr = [];
    for (let i = 0; i < 5; i++) {
      const response = await _latestPairsQuery(i * 1000);
      if (response.data.errors) {
        console.log(response.data.errors);
        pairsArr = [];
        i = 0;
      } else {
        const pairs = response.data.data.pairs;
        pairsArr.push(...pairs);
      }
    }

    return pairsArr;
  } catch (err) {
    console.log(err.message);
  }
};

const getTokenPriceUSD = async (tokenID) => {
  try {
    const response = await _tokenPriceUSDquery(tokenID);
    console.log(response)
    return Number(response.data.data.tokenDayDatas[0].priceUSD);
  } catch (err) {
    console.log(err.message);
  }
};

const getTokenDayData = async (tokenID, dateUNIX) => {
  try {
    const response = await _tokenDayDataQuery(tokenID, dateUNIX);
    return response.data.data.tokenDayDatas[0];
  } catch (err) {
    console.log(err.message);
  }
};

const getPairByID = async (pairID) => {
  try {
    const response = await _pairQuery(pairID);
    if (response.data.errors) {
      console.log(response.data.errors);
      console.log(`error for pairID = ${pairID}`);
    } else {
      const [result] = response.data.data.pairs;
      return result;
    }
  } catch (err) {
    console.log(err.message);
  }
};

/*
//get all pairs
const _allPairsQuery = async (lastID) => {
  try {
    const result = await axios.post(uniswapV2, {
      //https://thegraph.com/docs/en/querying/graphql-api/
      query: `
        query allPairs($lastID: String) {
          pairs(first: 1000, where: { id_gt: $lastID }) {
            id
          }
        }`,
      variables: { lastID: lastID },
    });

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const _pairQuery = async (pairID) => {
  try {
    const result = await axios.post(uniswapV2, {
      //https://thegraph.com/docs/en/querying/graphql-api/
      query: `
        query pairByID($pairID: String) {
          pair(id: $pairID) {
            token0 {
              id
            }
            token1 {
              id
            }
          }
        }`,
      variables: { pairID: pairID },
    });

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const getAllPairsV2 = async () => {
  try {
    let pairsArr = [];

    for (let i = 0; i < 1000; i++) {
      //try 20 times to fetch all tokens in case an error occurs
      let id = "0";
      let lastID;

      while (id !== lastID) {
        const response = await _allPairsQuery(id);
        lastID = id;
        if (response.data.errors) {
          console.log(response.data.errors);
          id = undefined;
        } else {
          response.data.data.pairs.forEach((pair) => {
            pairsArr.push(pair);
          });
          const indexLast = pairsArr.length - 1;
          const lastPair = pairsArr[indexLast];
          id = lastPair.id;
          console.log(id);
        }
      }
      if (pairsArr.length > 100000) {
        break;
      } else {
        console.log("retry fetching pairs");
        pairsArr = [];
      }
    }

    return pairsArr;
  } catch (err) {
    console.log(err.message);
  }
};*/

export {
  getLatestPairs,
  getTokenPriceUSD,
  getTokenDayData,
  getPairByID,
};
