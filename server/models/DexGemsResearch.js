import mongoose from "mongoose";

const DexGemsResearch = new mongoose.Schema(
  {
    researchData: { type: {}, required: true },
    isTweeted: { type: Boolean, required: true },
    //createdAt: {type: Date}, //comment in for import
    //updatedAt: {type: Date}, //comment in for import
  },
  {
    collection: "dexGemsResearch",
    timestamps: true, // comment out for import
  }
);

//Export model
export default mongoose.model("DexGemsResearch", DexGemsResearch);
