import DexGems from "../models/dexGems.js";
import { endOfDay, startOfDay } from "date-fns";

/* CREATE */
//save dexGems to db
export const dexGemsCreate = async (data) => {
  const dexGems = new DexGems({
    dexGems: data.dexGems,
    quoteTokenAdress: data.quoteTokenAdress,
    quoteTokenSymbol: data.quoteTokenSymbol,
    dex: data.dex,
    //createdAt: data.createdAt, //comment in for import
    //updatedAt: data.updatedAt, //comment in for import
  });
  try {
    await dexGems.save();
  } catch (err) {
    console.log(err.message);
  }
};

/* READ */
//get dexGems of a particular day/date
export const getDexGemsByDate = async (date) => {
  try {
    const dexGems = await DexGems.find({
      createdAt: {
        $gte: startOfDay(date),
        $lte: endOfDay(date),
      },
    });
    return dexGems;
  } catch (err) {
    console.log(err.message);
  }
};

//get dexGems of a given timeframe
export const getDexGemsByTimespan = async (startDate, endDate) => {
  try {
    const dexGems = await DexGems.find({
      createdAt: {
        $gte: startOfDay(startDate),
        $lte: endOfDay(endDate),
      },
    });
    return dexGems;
  } catch (err) {
    console.log(err.message);
  }
};

/* DELETE */
//delete particular dexgem token from db
export const deleteTokenById = async (id) => {
  try {
    // Delete the document by id
    await DexGems.updateMany(
      {},
      {
        $pull: {
          dexGems: {
            id: id,
          },
        },
      }
    );
    return { success: true, message: `deleted token ${id}` };
  } catch (err) {
    console.log(err.message);
  }
};
