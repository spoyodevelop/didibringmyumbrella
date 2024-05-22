function transformDataForNivo(data) {
  // Initialize an empty array to hold the transformed data
  let transformedData = [];

  // Iterate through each key in the data object
  Object.keys(data).forEach((key) => {
    // Check if the key starts with 'POP'
    if (/^POP\d+$/.test(key)) {
      // Extract the population group number
      let populationGroupNumber = parseInt(key.replace("POP", ""));
      if (data[key].arrayLength < 4) {
        return;
      }
      // Create a new object for each population group
      let groupData = {
        강수확률: `${populationGroupNumber}`,
        예보횟수: data[key].arrayLength,
        비가내린횟수: data[key].didItRainCount,
      };

      // Add the new object to the transformed data array
      transformedData.push(groupData);
    }
  });

  // Return the transformed data
  return transformedData;
}

function calculatePercentage(numerator, denominator) {
  // 분모가 0인 경우 오류 처리
  if (denominator === 0) {
    return "Error: Division by zero";
  }

  // 퍼센트 계산
  let percentage = (numerator / denominator) * 100;

  return percentage;
}
function financial(num, to) {
  return Number.parseFloat(num).toFixed(to);
}
// 예시 사용법

function calculateArrayLength(startPopulation, allOfPOPDataStats) {
  if (!allOfPOPDataStats) return { Length: 0, Rain: 0 };
  let Length = 0;
  let Rain = 0;
  startPopulation = +startPopulation;
  for (let i = startPopulation; i <= 100; i += 10) {
    const key = `POP${i}`;

    if (allOfPOPDataStats[key]) {
      Length += allOfPOPDataStats[key]?.arrayLength;
      Rain += allOfPOPDataStats[key]?.didItRainCount;
    }
  }

  return { Length, Rain };
}

const POPpercentage = (percent, tofixed, allOfPOPDataStats) =>
  financial(
    calculatePercentage(
      calculateArrayLength(percent, allOfPOPDataStats)?.Rain,
      calculateArrayLength(percent, allOfPOPDataStats)?.Length
    ),
    tofixed
  );
module.exports = {
  transformDataForNivo,
  calculatePercentage,
  financial,
  calculateArrayLength,
  POPpercentage,
};
