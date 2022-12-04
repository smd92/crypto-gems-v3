import mongoose from "mongoose";

const DexGemsSchema = new mongoose.Schema(
  {
    dexGems: { type: Array, required: true },
    quoteTokenAdress: { type: String, required: true },
    quoteTokenSymbol: { type: String, required: true },
    dex: { type: String, required: true },
  },
  {
    collection: "dexGems",
    timestamps: true,
  }
);

//Export model
export default mongoose.model("DexGems", DexGemsSchema);
