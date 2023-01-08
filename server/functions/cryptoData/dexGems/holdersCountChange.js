import { getTokenInfo } from "../apis/ethplorer.js";

export const getHoldersCountChange = async (dexGems) => {
  const mappedHoldersCountChange = [];

  for (let i = 0; i < dexGems.length; i++) {
    const token = dexGems[i];
    const holdersCountOld = token.holdersCount;
    const tokenInfo = await getTokenInfo(token.id);
    const holdersCountNew = tokenInfo.data.holdersCount;
    const holdersCountChangePct24h =
      (holdersCountNew / holdersCountOld - 1) * 100;
    token.holdersCountChangePct24h = holdersCountChangePct24h;
    mappedHoldersCountChange.push(token);
  }

  const sortedByHoldersCount = mappedHoldersCountChange.sort((a, b) => {
    if (a.holdersCountChangePct24h > b.holdersCountChangePct24h) return -1;
    if (a.holdersCountChangePct24h < b.holdersCountChangePct24h) return 1;
    if (a.holdersCountChangePct24h === b.holdersCountChangePct24h) return 0;
  });

  return sortedByHoldersCount;
};
