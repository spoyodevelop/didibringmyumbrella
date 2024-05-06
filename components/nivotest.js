const {
  d,
} = require("@tanstack/react-query-devtools/build/legacy/devtools-9h89nHJX");

function transformDataForNivoChart(data) {
  // 결과를 저장할 배열 초기화
  const transformedData = [];

  // 데이터 객체의 모든 POP 카테고리를 순회
  for (let key in data) {
    if (key.startsWith("POP")) {
      // 현재 POP 카테고리의 데이터를 가져옴
      const popData = data[key];

      // 퍼센티지를 계산
      const percentage = (popData.didItRainCount / popData.arrayLength) * 100;

      // 변환된 데이터 객체를 생성
      const transformedItem = {
        id: key, // POP 카테고리 이름
        value: percentage, // 퍼센티지 값
      };

      // 결과 배열에 추가
      transformedData.push(transformedItem);
    }
  }
}
const data = {
  DBData: {
    _id: "66272d03e1664fe341afd36c",
    administrativeArea: "Seoul",
    lastUpdatedSince: "2024-05-06T12:15:01.273Z",
    totalArrayCount: 123,
    totalDidItRainCount: 10,
    POP0: { arrayLength: 64, didItRainCount: 0 },
    POP10: { arrayLength: 0, didItRainCount: 0 },
    POP20: { arrayLength: 15, didItRainCount: 0 },
    POP30: { arrayLength: 29, didItRainCount: 0 },
    POP40: { arrayLength: 0, didItRainCount: 0 },
    POP50: { arrayLength: 0, didItRainCount: 0 },
    POP60: { arrayLength: 10, didItRainCount: 5 },
    POP70: { arrayLength: 3, didItRainCount: 3 },
    POP80: { arrayLength: 0, didItRainCount: 0 },
    POP90: { arrayLength: 1, didItRainCount: 1 },
    POP100: { arrayLength: 1, didItRainCount: 1 },
  },
};
console.log(transformDataForNivoChart(data.DBData));
