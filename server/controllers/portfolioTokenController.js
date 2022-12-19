import { createPortfolioToken, getPortfolioTokens } from "../db/portfolioToken";
import { check, validationResult } from "express-validator";

/* CREATE */
export const portfolioToken_createPortfolioToken = async (req, res) => {
  try {
    res.status(201).json(dataForDB);
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
