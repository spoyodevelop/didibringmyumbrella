const { XMLParser } = require("fast-xml-parser");

const { getTimeObj, getUrl } = require("./getUrlAndTimeObj");

async function fetchWeatherDataWithRetry(usage, dataType, location, delay) {
  // 최고 5번까지 시도한다.
  const maxTries = 5;

  for (let tries = 1; tries <= maxTries; tries++) {
    try {
      if (tries === 1) {
        console.log(`fetching Weather Data... this is first try....`);
      } else {
        console.log(
          `fetching weather data... this is ${tries} tries and ${
            maxTries - tries
          } tries remaining`
        );
      }
      const weatherData = await fetchWeatherData(usage, dataType, location);

      return weatherData;
    } catch (error) {
      if (tries === maxTries) {
        throw new Error(
          `Failed to fetch data for ${location.administrativeArea} after ${maxTries} attempts. Error: ${error.message}`
        );
      }

      // 1, 2, 4... 8초로 지수적으로 증가하는 딜레이를 사용한다.

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // 딜레이를 2배로 증가시킨다.
    }
  }
}

async function fetchWeatherData(usage, dataType, location) {
  const timeObj = getTimeObj(usage, dataType);
  const url = getUrl(location, timeObj);
  console.log(url);

  try {
    // 기상청 API로부터 데이터를 가져온다,
    const response = await fetch(url);

    // 일반적인 HTTP 에러를 처리한다. 하지만 대개는 여기서 에러가 발생하지 않는다.
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch data from ${url}. Status: ${response.status}`
      );
    }
    const xmlData = await response.text();
    const parser = new XMLParser();
    let jObj = parser.parse(xmlData);
    // jOBj가 없거나 jObj.response가 없는 경우 에러를 발생시킨다.  jObj.response.header가 없는 경우도 에러를 발생시킨다.

    if (!jObj || !jObj.response) {
      throw new Error(
        `Failed to fetch data for ${location.administrativeArea}. it has no jObj or jObj response`
      );
    }
    if (!jObj.response.header) {
      throw new Error(
        `Failed to fetch data for ${location.administrativeArea}. it has no header.`
      );
    }
    //http status가 200이지만, 에러가 발생이 안되는 경우코드가 여기까지 내려온다.
    //resultCode가 0이 아니거나 숫자가 아닌 경우 에러를 발생시킨다. NO_DATA의 경우에도 에러를 발생시킨다.
    if (
      isNaN(jObj.response.header.resultCode) ||
      +jObj.response.header.resultCode !== 0
    ) {
      throw new Error(
        `Failed to fetch data for ${location.administrativeArea}. Errors are ${jObj.response.header.resultCode} ${jObj.response.header.resultMsg}.`
      );
    }

    const newDate = new Date();
    const items = jObj.response.body.items;
    console.log("sucessfully fetched data for", location.administrativeArea);
    return {
      createdAt: newDate,
      dataType,
      usage,

      location,
      timeObj,
      ...items,
    };
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    throw error; // Re-throw the error to propagate it
  }
}

// DUMMY_CAPITAL.forEach((capital) => {
//   fetchWeatherDataWithRetry("DB", "currentData", capital, 1000).then((data) =>
//     console.log(data)
//   );
// });

//TODO server-side와 client-side 분리하기
//mongodb 와 연결하는 파일 따로 만들기.

// locations.forEach((location) => {
// mergeLocationsData(CAPITAL_LOCATION, location).then((mergedLocation) => {
//   // fetchWeatherData("client", "pastData", mergedLocation).then((data) =>
//   //   console.log(data)
//   // );
//   fetchWeatherData("client", "currentData", mergedLocation).then((data) =>
//     console.log(data)
//   );
// fetchWeatherData("DB", "pastData", mergedLocation).then((data) =>
//   console.log(data)
// );
// fetchWeatherData("DB", "currentData", mergedLocation).then((data) =>
//   console.log(data)
// );
//     });
//   });
// });
// fetchLocationsData().then((locations) => {
//   locations.forEach((location) => {
//     console.log(location);
//     mergeLocationsData(location).then((mergedLocation) =>
//       console.log(mergedLocation)
//     );
//   });
// });

// fetchLocationsData().then((locations) =>
//   locations.forEach((location) => {
//     console.log(location);
//     console.log(getLocationObj("client", location));
//   })
// );
module.exports = {
  fetchWeatherDataWithRetry,
};
