import mongoose from "mongoose";

const DexGemsResearch = new mongoose.Schema(
  {
    researchData: { type: {}, required: true },
    isTweeted: { type: Boolean, required: true },
    timestamp: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

//Export model
export default mongoose.model("DexGemsResearch", DexGemsResearch);
