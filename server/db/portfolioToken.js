import PortfolioToken from "../models/PortfolioToken.js";

/* CREATE */
//save PortfolioToken to db
export const createPortfolioToken = async (data) => {
  try {
    const portfolioToken = new PortfolioToken({
      tokenAddress: data.tokenAddress,
      tokenSymbol: data.tokenSymbol,
      tokenName: data.tokenName,
      buyAmount: data.buyAmount,
      buyPriceUSD: data.buyPriceUSD,
      buyFeeUSD: data.buyFeeUSD,
      buyTaxPct: data.buyTaxPct,
      sellTaxPct: data.sellTaxPct,
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

//get particular portfolioToken from db
export const getPortfolioTokenById = async (id) => {
  try {
    const portfolioToken = await PortfolioToken.findById(id);
    return portfolioToken;
  } catch (err) {
    console.log(err.message);
  }
};

/* UPDATE */
export const updatePortfolioTokenById = async (data) => {
  try {
    const portfolioToken = await PortfolioToken.findById(data.id);
    portfolioToken = data;
    await portfolioToken.save();
    return { success: true, message: `updated portfolioToken ${data.id}` };
  } catch (err) {
    console.log(err.message);
  }
};

/* DELETE */
//delete particular dexgem research from db
export const deletePortfolioTokenById = async (id) => {
  try {
    // Delete the document by id
    await PortfolioToken.deleteOne({ _id: id });
    return { success: true, message: `deleted portfolioToken ${id}` };
  } catch (err) {
    console.log(err.message);
  }
};
