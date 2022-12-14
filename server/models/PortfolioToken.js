import mongoose from "mongoose";

const PortfolioTokenSchema = new mongoose.Schema(
  {
    tokenAddress: { type: String, required: true },
    tokenSymbol: { type: String, required: true },
    tokenName: { type: String, required: true },
    buyAmount: { type: Number, required: true },
    buyPriceUSD: { type: Number, required: true },
    buyFeeUSD: { type: Number, required: true },
    buyTaxPct: { type: Number, required: true },
    sellTaxPct: { type: Number, required: true },
    currentPriceUSD: { type: Number },
  },
  {
    collection: "portfolioTokens",
    timestamps: true,
  }
);

//Export model
export default mongoose.model("PortfolioToken", PortfolioTokenSchema);
