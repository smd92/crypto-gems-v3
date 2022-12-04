import axios from "axios";

async function listingsLatest() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: "1",
          limit: "5000",
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY_CMC,
          "Accept-Encoding": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log(err.message);
  }
}

export { listingsLatest };
