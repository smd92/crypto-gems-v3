import PortfolioToken from "../models/PortfolioToken.js";

/* CREATE */
//save PortfolioToken to db
export const createPortfolioToken = async (data) => {
  try {
    const portfolioToken = new PortfolioToken({
      tokenAddress: data.tokenAddress,
      tokenSymbol: data.tokenSymbol,
      buyAmount: data.buyAmount,
      buyPriceUSD: data.buyPriceUSD,
      buyFeeUSD: data.buyFeeUSD,
    });
    await portfolioToken.save();

    return portfolioToken;
  } catch (err) {
    console.log(err.message);
  }
};

/* READ */
//get list of portfolioTokens
export const getPortfolioTokens = async () => {
  try {
    const portfolioTokens = await PortfolioToken.find();
    return portfolioTokens;
  } catch (err) {
    console.log(err.message);
  }
};
