import {
  createPortfolioToken,
  getPortfolioTokens,
  getPortfolioTokenById,
  updatePortfolioTokenById,
  deletePortfolioTokenById,
} from "../db/portfolioToken.js";
import { getTokenInfo } from "../functions/cryptoData/apis/ethplorer.js";
import { check, validationResult } from "express-validator";

/* CREATE */
export const portfolioToken_createPortfolioToken = async (req, res) => {
  try {
    //validate and sanitize form data
    req.body.tokenSymbol = req.body.tokenSymbol.toUpperCase();

    await check("tokenAddress").trim().isString().run(req);
    await check("tokenSymbol").trim().isString().run(req);
    await check("tokenName").trim().isString().run(req);
    await check("buyAmount").toFloat().isFloat().run(req);
    await check("buyPriceUSD").toFloat().isFloat().run(req);
    await check("buyFeeUSD").toFloat().isFloat().run(req);
    await check("buyTaxPct").toFloat().isFloat().run(req);
    await check("sellTaxPct").toFloat().isFloat().run(req);
    if (req.body.currentPriceUSD)
      await check("currentPriceUSD").toFloat().isFloat().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const response = await createPortfolioToken(req.body);

    res.status(201).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const portfolioToken_getPortfolioTokens = async (req, res) => {
  try {
    const data = await getPortfolioTokens();

    //get current price and map it to portfolioToken
    for (let i = 0; i < data.length; i++) {
      const token = data[i];
      const tokenInfo = await getTokenInfo(token.tokenAddress);
      if (tokenInfo.data.price)
        token.currentPriceUSD = tokenInfo.data.price.rate;
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const portfolioToken_getPortfolioTokenById = async (req, res) => {
  try {
    const data = await getPortfolioTokenById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const portfolioToken_updatePortfolioTokenById = async (req, res) => {
  try {
    //validate and sanitize form data
    req.body.tokenSymbol = req.body.tokenSymbol.toUpperCase();

    await check("tokenAddress").trim().isString().run(req);
    await check("tokenSymbol").trim().isString().run(req);
    await check("tokenName").trim().isString().run(req);
    await check("buyAmount").toFloat().isFloat().run(req);
    await check("buyPriceUSD").toFloat().isFloat().run(req);
    await check("buyFeeUSD").toFloat().isFloat().run(req);
    await check("buyTaxPct").toFloat().isFloat().run(req);
    await check("sellTaxPct").toFloat().isFloat().run(req);
    if (req.body.currentPriceUSD)
      await check("currentPriceUSD").toFloat().isFloat().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const response = await updatePortfolioTokenById(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const portfolioToken_deletePortfolioTokenById = async (req, res) => {
  try {
    const response = await deletePortfolioTokenById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};
