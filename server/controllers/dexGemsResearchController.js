import {
  createDexGemsResearch,
  getDexGemsResearch,
  getDexGemsResearchById,
  updateDexGemsResearchById,
  deleteDexGemsResearchById,
} from "../db/dexGemsResearch.js";
import { check, validationResult } from "express-validator";

/* CREATE */
export const dexGemsResearch_createDexGemsResearch = async (req, res) => {
  try {
    //validate and sanitize form data
    req.body.symbol = req.body.symbol.toUpperCase();

    await check("dexToolsURL").trim().isURL().run(req);
    await check("symbol").trim().isString().run(req);
    await check("tokenAdress").trim().isString().run(req);
    await check("marketCapUSD").toInt().isInt().run(req);
    await check("buyTaxPct").toFloat().isFloat().run(req);
    await check("sellTaxPct").toFloat().isFloat().run(req);
    await check("dextScore").toInt().isInt().run(req);
    await check("tokenSnifferScore").toInt().isInt().run(req);
    await check("ownershipRenounced").toBoolean().isBoolean().run(req);
    await check("liqLockedPct").toFloat().isFloat().run(req);
    await check("numberOfHolders").toInt().isInt().run(req);
    await check("numberOfWhales").toInt().isInt().run(req);
    await check("notes").trim().isString().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const dataForDB = {
      researchData: req.body,
      isTweeted: false,
    };
    await createDexGemsResearch(dataForDB);

    res.status(201).json(dataForDB);
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ message: err.message });
  }
};

/*READ*/
export const dexGemsResearch_getDexGemsResearch = async (req, res) => {
  try {
    const data = await getDexGemsResearch();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const dexGemsResearch_getDexGemsResearchById = async (req, res) => {
  try {
    const data = await getDexGemsResearchById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const dexGemsResearch_updateDexGemsResearchById = async (req, res) => {
  try {
    //validate and sanitize form data
    req.body.symbol = req.body.symbol.toUpperCase();

    await check("dexToolsURL").trim().isURL().run(req);
    await check("symbol").trim().isString().run(req);
    await check("name").trim().isString().run(req);
    await check("tokenAdress").trim().isString().run(req);
    await check("marketCapUSD").toInt().isInt().run(req);
    await check("buyTaxPct").toInt().isInt().run(req);
    await check("sellTaxPct").toInt().isInt().run(req);
    await check("dextScore").toInt().isInt().run(req);
    await check("tokenSnifferScore").toInt().isInt().run(req);
    await check("ownershipRenounced").toBoolean().isBoolean().run(req);
    await check("liqLockedPct").toInt().isInt().run(req);
    await check("numberOfHolders").toInt().isInt().run(req);
    await check("numberOfWhales").toInt().isInt().run(req);
    await check("isBuy").toBoolean().isBoolean().run(req);
    await check("notes").trim().isString().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const dataForDB = {
      id: req.params.id,
      researchData: req.body,
    };

    const response = await updateDexGemsResearchById(dataForDB);
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const dexGemsResearch_deleteDexGemsResearchById = async (req, res) => {
  try {
    const response = await deleteDexGemsResearchById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};