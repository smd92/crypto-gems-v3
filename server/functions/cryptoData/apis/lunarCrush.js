import axios from "axios";

export const getLunarCrushData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_LUNARCRUSH}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
