import axios from "axios";

const getLunarCrushData = async (url) => {
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

export default getLunarCrushData;
