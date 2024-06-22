//moment.js를 사용하여 현재 시간을 기준으로 단기예보의 baseTime을 계산하는 함수
const moment = require("moment");
//node js 환경에서 혹시 timezone이 설정되어 있지 않다면, 아래 코드를 통해 env.TZ 한국으로 설정해주어야 한다.
process.env.TZ = "Asia/Seoul";
//단기예보의 baseTime이 해당 timeRange에 떨어지면, 그 baseTime을 return한다.
//단기예보는 해당 시간, 2, 5, 8, 11, 14, 17, 20, 23시+ 10분에 갱신되지만,
//해당 시간을 baseTime으로 사용하기에는 너무 이르기 때문에(오류가 잦음), 1시간을 더해서 가져오게 만들었다.
const timeRanges = [
  { startTime: "00:01", endTime: "03:00", baseTime: 23 },
  { startTime: "03:01", endTime: "06:00", baseTime: 2 },
  { startTime: "06:01", endTime: "09:00", baseTime: 5 },
  { startTime: "09:01", endTime: "12:00", baseTime: 8 },
  { startTime: "12:01", endTime: "15:00", baseTime: 11 },
  { startTime: "15:01", endTime: "18:00", baseTime: 14 },
  { startTime: "18:01", endTime: "21:00", baseTime: 17 },
  { startTime: "21:01", endTime: "00:00", baseTime: 20 },
];

function getBaseTimeForGivenTime(givenDate) {
  const givenMoment = moment(givenDate);
  const currentDate = moment();

  //"00:00에서 03:00 사이의 시간은 전날 23시로 처리 1일을 빼준다."
  if (
    givenMoment.isBetween(
      moment("00:00", "HH:mm"),
      moment("03:00", "HH:mm"),
      null,
      "[)"
    )
  ) {
    currentDate.subtract(1, "day");
  }

  for (const range of timeRanges) {
    const startTime = moment(range.startTime, "HH:mm");
    let endTime = moment(range.endTime, "HH:mm");

    if (range.startTime === "21:01") {
      startTime.subtract(1, "day");
    }
    // 00:00의 경우 endTime이 00:00이기 때문에 1일을 더해준다.
    if (range.endTime === "00:00") {
      endTime = endTime.add(1, "day");
    }

    // givenDate가 startTime과 endTime 사이에 있으면 해당 baseTime을 return한다.
    if (givenMoment.isBetween(startTime, endTime, null, "[]")) {
      currentDate.set({
        hour: range.baseTime,
        minute: 0,
        second: 0,
        millisecond: 0,
      });

      return currentDate.toDate();
    }
  }
  // givenDate가 timeRanges에 포함되지 않는 경우, 23시로 설정한다. (기본값) fallback 로직.
  currentDate.set({ hour: 23, minute: 0, second: 0, millisecond: 0 });
  return currentDate.toDate();
}

// const newDate = new Date();
// const testCases = [
//   // Test cases within defined ranges
//   { givenDate: "2024-04-28T00:01:00", expectedOutput: 23 },
//   { givenDate: "2024-04-28T22:00:00", expectedOutput: 20 },
//   { givenDate: "2024-04-28T08:15:00", expectedOutput: 5 },
//   { givenDate: "2024-04-28T15:30:00", expectedOutput: 14 },

//   // Test cases at the boundaries of defined ranges
//   { givenDate: "2024-04-28T23:14:59", expectedOutput: 20 },
//   { givenDate: "2024-04-28T02:15:00", expectedOutput: 23 },

//   // Test cases for times that span across midnight
//   { givenDate: "2024-04-28T23:59:59", expectedOutput: 20 },
//   { givenDate: "2024-04-28T00:01:10", expectedOutput: 23 },

//   // Test cases for times just before and after the defined ranges
//   { givenDate: "2024-04-28T23:14:58", expectedOutput: 20 },
//   { givenDate: "2024-04-28T02:15:01", expectedOutput: 23 },

//   // Test cases for times at the very start and end of the day
//   { givenDate: "2024-04-28T00:00:00", expectedOutput: 20 },
//   { givenDate: "2024-04-28T23:59:59", expectedOutput: 20 },

//   // Test cases for times that fall between ranges
//   { givenDate: "2024-04-28T02:14:59", expectedOutput: 23 },
//   { givenDate: "2024-04-28T05:30:00", expectedOutput: 2 },

//   // Test cases for times just before the earliest time in the range
//   { givenDate: "2024-04-28T23:14:59", expectedOutput: 20 },
//   // Test cases for times just after the latest time in the range
//   { givenDate: "2024-04-28T02:15:00", expectedOutput: 23 },

//   { givenDate: newDate, expectedOutput: 5 },
// ];

// Example usage

// testCases.forEach((testCase, index) => {
//   const { givenDate, expectedOutput } = testCase;
//   const result = getBaseTimeForGivenTime(givenDate);
//   console.log(`Additional Test Case ${index + 1}:`);
//   console.log(`Given Time: ${givenDate}`);
//   console.log(`Expected Output: ${expectedOutput}`);
//   console.log(`Actual Output: ${result}`);

//   console.log("----------------------");
// });
module.exports = {
  getBaseTimeForGivenTime,
};
