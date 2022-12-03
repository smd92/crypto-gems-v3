import Gems from "../models/gems.js";
import { endOfDay, startOfDay } from "date-fns";

/* CREATE */
//save gems to db
const gemsCreate = async (data) => {
  const gems = new Gems({
    minMarketCap: data.minMarketCap,
    maxMarketCap: data.maxMarketCap,
    gems: data.gems,
    unmatched: data.unmatched,
  });
  try {
    await gems.save();
  } catch (err) {
    console.log(err.message);
  }
};

/* READ */
//get all gems of the last n days timespan
const getSavedGemsDaysAgo = async (numberOfDays) => {
  const today = new Date();
  const yesterday = new Date(today.getTime()).setDate(today.getDate() - 1);
  const nDaysAgo = new Date(today.getTime()).setDate(
    today.getDate() - numberOfDays
  );
  try {
    const gems = await Gems.find({
      createdAt: {
        $gte: startOfDay(nDaysAgo),
        $lte: endOfDay(yesterday), //exclude todays gems
      },
    });
    return gems;
  } catch (err) {
    console.log(err.message);
  }
};

//get gems of a particular day/date
const getGemsByDate = async (date) => {
  try {
    const gems = await Gems.find({
      createdAt: {
        $gte: startOfDay(date),
        $lte: endOfDay(date),
      },
    });
    return gems;
  } catch (err) {
    console.log(err.message);
  }
};

export { gemsCreate, getSavedGemsDaysAgo, getGemsByDate };
