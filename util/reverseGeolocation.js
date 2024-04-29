const axios = require("axios");
const axiosRetry = require("axios-retry").default;

const naverAPIClientID = process.env.NAVER_CLIENT_ID;

const naverAPIClientSecret = process.env.NAVER_CLIENT_SECRET;
console.log(naverAPIClientID);
console.log(naverAPIClientSecret);
async function reverseGeocode(lat, lng) {
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&output=json`;
  const headers = {
    "X-NCP-APIGW-API-KEY-ID": naverAPIClientID,
    "X-NCP-APIGW-API-KEY": naverAPIClientSecret,
  };
  try {
    axiosRetry(axios, { retries: 3 });
    const response = await axios.get(url, { headers });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
// reverseGeocode(37.5665, 126.978).then((data) => console.log(data));
