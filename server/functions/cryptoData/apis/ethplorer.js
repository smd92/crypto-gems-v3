import axios from "axios";

export const getTokenInfo = async (tokenAddress) => {
  try {
    const response = await axios.get(
      `https://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=${process.env.API_KEY_ETHPLORER}`,
      {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.log(err.message);
  }
};
