import { getTokenDayDataV2 } from "./uniswapV2.js";

export const getVolumeChange = async (dexGems) => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const UTCString = date.toUTCString();
  const UTCDate = new Date(UTCString);
  const dateUNIX = Math.floor(UTCDate.getTime() / 1000); //get UNIX timestamp of last midnight

  const mappedVolumeChange = [];
  for (let i = 0; i < dexGems.length; i++) {
    const tokenDayData = await getTokenDayDataV2(dexGems[i].id, dateUNIX);
    if (tokenDayData) {
      const todayVolume = tokenDayData.dailyVolumeUSD;

      const indexLastDayData = dexGems[i].dayDatas.length - 1;
      const lastVolume = dexGems[i].dayDatas[indexLastDayData].dailyVolumeUSD;

      dexGems[i].volumeChangePct =
        Math.round(
          ((todayVolume / lastVolume - 1) * 100 + Number.EPSILON) * 100
        ) / 100;

      mappedVolumeChange.push(dexGems[i]);
    }
  }
  const sorted = mappedVolumeChange.sort((a, b) => {
    if (a.volumeChangePct > b.volumeChangePct) return -1;
    if (a.volumeChangePct < b.volumeChangePct) return 1;
    if (a.volumeChangePct === b.volumeChangePct) return 0;
  });
  return sorted;
};
