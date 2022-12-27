import mongoose from "mongoose";

const GemsSchema = new mongoose.Schema(
  {
    minMarketCap: { type: Number, required: true },
    maxMarketCap: { type: Number, required: true },
    gems: { type: Array, required: true },
    unmatched: { type: Array, required: true },
    //createdAt: {type: Date}, //comment in for import
    //updatedAt: {type: Date}, //comment in for import
  },
  {
    collection: "gems",
    timestamps: true, // comment out for import
  }
);

//Export model
export default mongoose.model("Gems", GemsSchema);
