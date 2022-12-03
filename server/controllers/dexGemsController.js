import { getDexGemsByDate, deleteTokenById } from "../db/dexGems.js";

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
