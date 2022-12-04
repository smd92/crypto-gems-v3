import mongoose from "mongoose";

const GemsSchema = new mongoose.Schema(
  {
    minMarketCap: { type: Number, required: true },
    maxMarketCap: { type: Number, required: true },
    gems: { type: Array, required: true },
    unmatched: { type: Array, required: true },
  },
  {
    collection: "gems",
    timestamps: true,
  }
);

//Export model
export default mongoose.model("Gems", GemsSchema);
