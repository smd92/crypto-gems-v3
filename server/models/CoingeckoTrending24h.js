import mongoose from "mongoose";

const CoingeckoTrending24hSchema = new mongoose.Schema(
  {
    coins: { type: Array, required: true },
    timestamp: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

//Export model
export default mongoose.model(
  "CoingeckoTrending24h",
  CoingeckoTrending24hSchema
);
