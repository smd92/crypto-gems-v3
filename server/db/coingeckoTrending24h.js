import CoingeckoTrending24h from "../models/coingeckoTrending24h.js";

/* CREATE */

//save coingecko trending coins 24h to db
export const coingeckoTrending24hCreate = async (data) => {
    const coingeckoTrending24h = new CoingeckoTrending24h({
        coins: data.coins,
    });
    try {
        await coingeckoTrending24h.save();
    } catch (err) {
        console.log(err.message);
    }
};