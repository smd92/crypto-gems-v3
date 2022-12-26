import DexGemsResearch from "../models/DexGemsResearch.js";

/* CREATE */
//save dexGems research to db
export const createDexGemsResearch = async (data) => {
  try {
    const dexGemsResearch = new DexGemsResearch({
      researchData: data.researchData,
      isTweeted: data.isTweeted,
      //createdAt: data.createdAt, //comment in for import
      //updatedAt: data.updatedAt, //comment in for import
    });
    await dexGemsResearch.save();
  } catch (err) {
    console.log(err.message);
  }
};

/* READ */
//get list of dexGems research
export const getDexGemsResearch = async () => {
  try {
    const dexGemsResearch = await DexGemsResearch.find();
    return dexGemsResearch;
  } catch (err) {
    console.log(err.message);
  }
};

//get particular dexgem research from db
export const getDexGemsResearchById = async (id) => {
  try {
    const dexGemsResearch = await DexGemsResearch.findById(id);
    return dexGemsResearch;
  } catch (err) {
    console.log(err.message);
  }
};

/* UPDATE */
export const updateDexGemsResearchById = async (data) => {
  try {
    const dexGemsResearch = await DexGemsResearch.findById(data.id);
    dexGemsResearch.researchData = data.researchData;
    await dexGemsResearch.save();
    return { success: true, message: `updated research ${data.id}` };
  } catch (err) {
    console.log(err.message);
  }
};

//mark dexgems research as tweeted
export const markResearchTweeted = async (id) => {
  try {
    const dexGemsResearch = await DexGemsResearch.findById(id);
    dexGemsResearch.isTweeted = true;
    await dexGemsResearch.save();
    return {
      success: true,
      message: `set research id ${id}'s tweeted status to true`,
    };
  } catch (err) {
    console.log(err.message);
  }
};

/* DELETE */
//delete particular dexgem research from db
export const deleteDexGemsResearchById = async (id) => {
  try {
    // Delete the document by id
    await DexGemsResearch.deleteOne({ _id: id });
    return { success: true, message: `deleted research ${id}` };
  } catch (err) {
    console.log(err.message);
  }
};
