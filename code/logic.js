const ship = (length) => {
  let timesHit = 0;
  let sunk = false;
  
  const hit = () => {
    timesHit++;
  }

  const isSunk = () => {
    if (length <= timesHit) {
      sunk = true;
    }
    return sunk;
  }

  return {
    hit,
    isSunk
  };
};
