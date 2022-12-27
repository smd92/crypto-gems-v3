import CoingeckoTrending24h from "../models/CoingeckoTrending24h.js";

/* CREATE */
//save coingecko trending coins 24h to db
export const coingeckoTrending24hCreate = async (data) => {
  const coingeckoTrending24h = new CoingeckoTrending24h({
    coins: data.coins,
    //createdAt: data.createdAt, //comment in for import
    //updatedAt: data.updatedAt, //comment in for import
  });
  try {
    await coingeckoTrending24h.save();
  } catch (err) {
    console.log(err.message);
  }
};
