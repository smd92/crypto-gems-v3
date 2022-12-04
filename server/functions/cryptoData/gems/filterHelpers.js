function getIDsFromCGList(dataCMC, coinListCG) {
  let IDs = [];

  dataCMC.forEach((cmc) => {
    let cmcSymbol = cmc.symbol.toLowerCase();
    let cmcSlug = cmc.slug.toLowerCase();
    let cmcName = cmc.name.toLowerCase();
    coinListCG.forEach((cg) => {
      let cgID = cg.id;
      let cgSymbol = cg.symbol.toLowerCase();
      let cgName = cg.name.toLowerCase();
      if (cmcName === cgID && cmcSymbol === cgSymbol) {
        IDs.push(cgID);
      } else if (
        cmcName != cgID &&
        cmcSymbol === cgSymbol &&
        cmcSlug === cgID
      ) {
        IDs.push(cgID);
      } else if (
        cmcName != cgID &&
        cmcName === cgName &&
        cmcSymbol === cgSymbol
      ) {
        IDs.push(cgID);
      }
    });
  });

  return IDs;
}

function getUnmatchedCoins(dataCMC, coinsCG) {
  let notMatched = [];
  let matchingCG = [];

  let matchingCMC = dataCMC.map((obj) => {
    return {
      cmcSymbol: obj.symbol.toLowerCase(),
      cmcSlug: obj.slug.toLowerCase(),
      cmcName: obj.name.toLowerCase(),
    };
  });

  coinsCG.forEach((obj) => {
    if (obj.symbol && obj.id && obj.name) {
      matchingCG.push(obj.symbol.toLowerCase());
      matchingCG.push(obj.id.toLowerCase());
      matchingCG.push(obj.name.toLowerCase());
    }
  });

  matchingCMC.forEach((obj) => {
    let hasVal = [];
    for (let key in obj) {
      hasVal.push(matchingCG.includes(obj[key]));
    }
    if (!hasVal.includes(true)) notMatched.push(obj);
  });

  return notMatched;
}

function getTickers(coinsCG) {
  let coinTickersCG = [];
  let coinTickersCGRaw = coinsCG.map((obj) => {
    if (obj != undefined && obj.tickers != undefined && obj.tickers.length > 0)
      return obj;
  });
  //remove null
  coinTickersCGRaw.forEach((obj) => {
    if (obj != null) coinTickersCG.push(obj);
  });
  return coinTickersCG;
}

function getVolumesFromTickers(coinCG) {
  let volumes = {};
  let volumeValuesAll = coinCG.tickers.map((ticker) => {
    return ticker.volume != undefined ? ticker.volume : 0;
  });

  let volumeValuesGreen = coinCG.tickers.map((ticker) => {
    return ticker["trust_score"] === "green" && ticker.volume != undefined
      ? ticker.volume
      : 0;
  });

  let totalVolume = volumeValuesAll.reduce((acc, val) => {
    return acc + val;
  });

  let greenVolume = volumeValuesGreen.reduce((acc, val) => {
    return acc + val;
  });

  volumes.totalVolume = totalVolume;
  volumes.greenVolume = greenVolume;

  return volumes;
}

export {
  getIDsFromCGList,
  getUnmatchedCoins,
  getTickers,
  getVolumesFromTickers,
};
