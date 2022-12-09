import mongoose from "mongoose";

const DexGemsSchema = new mongoose.Schema(
  {
    dexGems: { type: Array, required: true },
    quoteTokenAdress: { type: String, required: true },
    quoteTokenSymbol: { type: String, required: true },
    dex: { type: String, required: true },
    //createdAt: {type: Date}, //comment in for import
    //updatedAt: {type: Date}, //comment in for import
  },
  {
    collection: "dexGems",
    timestamps: true, // comment out for import
  }
);

//Export model
export default mongoose.model("DexGems", DexGemsSchema);
