import mongoose from "mongoose";

const DexGemsResearch = new mongoose.Schema(
  {
    researchData: { type: {}, required: true },
    isTweeted: { type: Boolean, required: true },
  },
  {
    collection: "dexGemsResearch",
    timestamps: true,
  }
);

//Export model
export default mongoose.model("DexGemsResearch", DexGemsResearch);
