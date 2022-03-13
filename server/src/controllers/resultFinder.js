const quadritic = (weightedVotes) => {
  // WeightedVotes: [ {weight: 1, option: 1}]
  const sqrtedWeights = weightedVotes.reduce((pV, cV) => {
    const crMap = new Map([...pV]);
    const currentComputedWeight = pV.get(cV.option) ? pV.get(cV.option) : 0;
    crMap.set(cV.option, Math.sqrt(cV.weight) + currentComputedWeight);
    return crMap;
  }, new Map());

  return [...sqrtedWeights].map((item) => ({
    option: item[0],
    amount: Math.pow(item[1], 2),
  }));
};

const testVotes1 = [
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 100, option: 1 },
  { weight: 10000, option: 2 },
  { weight: 2000, option: 3 },
  { weight: 2000, option: 3 },
  { weight: 2000, option: 3 },
  { weight: 2000, option: 3 },
  { weight: 2000, option: 3 },
];

const normal = (weightedVotes) => {
  // WeightedVotes: [ {weight: 1, option: 1}]
  const weights = weightedVotes.reduce((pV, cV) => {
    const crMap = new Map([...pV]);
    const currentComputedWeight = pV.get(cV.option) ? pV.get(cV.option) : 0;
    crMap.set(cV.option, 1 + currentComputedWeight);
    return crMap;
  }, new Map());

  return [...weights].map((item) => ({
    option: item[0],
    amount: item[1],
  }));
};

const weighted = (weightedVotes) => {
  // WeightedVotes: [ {weight: 1, option: 1}]
  const weights = weightedVotes.reduce((pV, cV) => {
    const crMap = new Map([...pV]);
    const currentComputedWeight = pV.get(cV.option) ? pV.get(cV.option) : 0;
    crMap.set(cV.option, cV.weight + currentComputedWeight);
    return crMap;
  }, new Map());

  return [...weights].map((item) => ({
    option: item[0],
    amount: item[1],
  }));
};

console.log(quadritic(testVotes1)); // {option: 1, amount: 50}, {option: 2, amount: 50}
console.log(normal(testVotes1)); // {option: 1, amount: 50}, {option: 2, amount: 50}
console.log(weighted(testVotes1));

module.exports = { quadritic, normal, weighted };
