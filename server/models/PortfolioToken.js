import mongoose from "mongoose";

const PortfolioTokenSchema = new mongoose.Schema(
  {
    buyAmount: { type: Number, required: true },
    buyPriceUSD: { type: Number, required: true },
    buyFeeUSD: { type: Number, required: true },
    tokenAddress: { type: String, required: true },
    tokenSymbol: { type: String, required: true },
  },
  {
    collection: "portfolioTokens",
    timestamps: true,
  }
);

//Export model
export default mongoose.model("PortfolioToken", PortfolioTokenSchema);
