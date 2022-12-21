import { createPortfolioToken, getPortfolioTokens } from "../db/portfolioToken.js";
import { check, validationResult } from "express-validator";

/* CREATE */
export const portfolioToken_createPortfolioToken = async (req, res) => {
  try {
    //validate and sanitize form data
    req.body.tokenSymbol = req.body.tokenSymbol.toUpperCase();

    await check("tokenAddress").trim().isString().run(req);
    await check("tokenSymbol").trim().isString().run(req);
    await check("buyAmount").toInt().isInt().run(req);
    await check("buyPriceUSD").toInt().isInt().run(req);
    await check("buyFeeUSD").toInt().isInt().run(req);

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
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};
