import { getDexGemsByDate, getLatestDexGems, deleteTokenById } from "../db/dexGems.js";

/* READ */
export const dexGems_getLatestDexGems = async (req, res) => {
  try {
    const response = await getLatestDexGems();
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
}

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
