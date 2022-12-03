const threadHelper = (parameters) => {
  //stay within character limit of 180
  //last parameters.item, fits in current tweet, so push and finish
  if (
    parameters.tweetArr.join("").length + parameters.item.length <= 180 &&
    parameters.data.indexOf(parameters.obj) === parameters.data.length - 1
  ) {
    parameters.tweetArr.push(parameters.item);
    parameters.threadArr.push(parameters.tweetArr.join(""));
    //not last parameters.item, fits in current tweet, so push
  } else if (
    parameters.tweetArr.join("").length + parameters.item.length <=
    180
  ) {
    parameters.tweetArr.push(parameters.item);
    //last parameters.item, does not fit in current tweet, so finish current tweet and push parameters.item to thread as a new tweet
  } else if (
    parameters.tweetArr.join("").length + parameters.item.length > 180 &&
    parameters.data.indexOf(parameters.obj) === parameters.data.length - 1
  ) {
    parameters.threadArr.push(parameters.tweetArr.join(""));
    parameters.threadArr.push(parameters.item);
    //current tweet is full, so finish current tweet, push current tweet to thread and start new tweet
  } else {
    parameters.threadArr.push(parameters.tweetArr.join(""));
    parameters.tweetArr = [parameters.item];
  }

  //assign mutated parameters for return
  const threadArr = parameters.threadArr;
  const tweetArr = parameters.tweetArr;
  return {
    threadArr,
    tweetArr,
  };
};

export { threadHelper };
