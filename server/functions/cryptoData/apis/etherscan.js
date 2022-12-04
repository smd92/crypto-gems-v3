import fetch from "node-fetch";

const getTotalSupply = async (contractAdress) => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${contractAdress}&apikey=${process.env.API_KEY_ETHERSCAN}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`error at contract adress ${contractAdress}: ${err.message}`);
  }
};

export { getTotalSupply };
