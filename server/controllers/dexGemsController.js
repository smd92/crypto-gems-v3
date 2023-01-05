import {
  getDexGemsByDate,
  getDexGemsByTimespan,
  getLatestDexGems,
  deleteTokenById,
} from "../db/dexGems.js";
import { getPriceChange } from "../functions/cryptoData/dexGems/priceChange.js";

/* READ */
export const dexGems_getDexGemsByTimespan = async (req, res) => {
  try {
    const startDate = new Date(JSON.parse(req.body.startDate));
    const endDate = new Date(JSON.parse(req.body.endDate));

    const response = await getDexGemsByTimespan(startDate, endDate);
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const dexGems_getLatestDexGems = async (req, res) => {
  try {
    const response = await getLatestDexGems();
    const dexGems = response[0].dexGems;
    const mappedPriceChange = await getPriceChange(dexGems);
    res.status(200).json(mappedPriceChange);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const dexGems_getDexGemsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const data = await getDexGemsByDate(date);
    if (data.length === 1) {
      const dexGems = data[0].dexGems;
      const mappedPriceChange = await getPriceChange(dexGems);
      res.status(200).json(mappedPriceChange);
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const dexGems_deleteTokenById = async (req, res) => {
  try {
    const response = await deleteTokenById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

//data_dexGems_delta_date_get fehlt
