import { createClient, createTestClient } from "./twitter_config.js";

const counterEmoji = String.fromCodePoint(0x1f539);

const buildTweet1 = (data) => {
  const lightningEmoji = String.fromCodePoint(0x26a1);
  const crystalballEmoji = String.fromCodePoint(0x1f52e);

  const heading = `${lightningEmoji}${crystalballEmoji} Potentially interesting Microcap play:`;
  const symbolAndName = `$${data.researchData.symbol} ${data.researchData.name}`;
  const mCap = `${counterEmoji} MarketCap: ${
    data.researchData.marketCapUSD / 1000
  }k`;
  const tax = `${counterEmoji} Buy tax: ${data.researchData.buyTaxPct}%, Sell tax: ${data.researchData.sellTaxPct}%`;
  const dextScore = `${counterEmoji} DEXTscore: ${data.researchData.dextScore}/99`;
  const tokenSnifferScore = `${counterEmoji} TokenSniffer Score: ${data.researchData.tokenSnifferScore}/100`;

  const tweet =
    heading +
    "\n" +
    "\n" +
    symbolAndName +
    "\n" +
    mCap +
    "\n" +
    tax +
    "\n" +
    dextScore +
    "\n" +
    tokenSnifferScore +
    "\n" +
    data.researchData.dexToolsURL;

  return tweet;
};

/* const buildTweet2 = (data) => {
  const ownershipRenounced = `${counterEmoji} Ownership: renounced`;
  const liqLocked = `${counterEmoji} Locked liquidity: ${
    data.researchData.liqLocked / 1000
  }k`;
  const numberOfHolders = `${counterEmoji} Holders: ${data.researchData.numberOfHolders}`;
  const largeHolders = `${counterEmoji} (very) Large Holders: ${data.researchData.numberOfWhales}`;

  const tweet =
    ownershipRenounced +
    "\n" +
    liqLocked +
    "\n" +
    numberOfHolders +
    "\n" +
    largeHolders;

  return tweet;
}; */

export async function tweet_dexGemsResearch(data) {
  try {
    const client = createClient();
    const tweet1 = buildTweet1(data);
    //const tweet2 = buildTweet2(data);
    //await client.v1.tweetThread([tweet1, tweet2]);
    await client.v1.tweet(tweet1);
  } catch (err) {
    console.log("twitter_dexGemsResearch.js: " + err.message);
  }
}
