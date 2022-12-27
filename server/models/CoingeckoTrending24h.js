import mongoose from "mongoose";

const CoingeckoTrending24hSchema = new mongoose.Schema(
  {
    coins: { type: Array, required: true },
    //createdAt: {type: Date}, //comment in for import
    //updatedAt: {type: Date}, //comment in for import
  },
  {
    collection: "coingeckoTrending24h",
    timestamps: true, // comment out for import
  }
);

//Export model
export default mongoose.model(
  "CoingeckoTrending24h",
  CoingeckoTrending24hSchema
);
