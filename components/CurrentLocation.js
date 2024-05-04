import { useEffect, useState } from "react";
import { CAPITAL_LOCATION } from "@/util/locations";

import { seoulLatitude, seoulLongitude } from "@/util/locations";
import { useWeatherStore } from "@/app/store/weather-store";

async function fetchLocationData(latitude, longitude) {
  try {
    const response = await fetch(
      `/api/weather/locationfetching?latitude=${latitude}&longitude=${longitude}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch location data: ${error.message}`);
  }
}

const CurrentLocation = () => {
  const {
    latitude,
    longitude,

    updatePlaceData,
    placeData,
    place,

    currentPlaceData,
    updateCurrentPlaceData,

    systemMessage: { status: systemStatus, message: systemMessage },
    updateErrorMessage,
  } = useWeatherStore();

  const [showCurrentLocation, setShowCurrentLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (latitude && longitude) {
      fetchLocationData(latitude, longitude)
        .then((data) => {
          // Once data is fetched, update the place data
          updatePlaceData(data);

          // Now that we have data, update the current place data
          if (latitude !== seoulLatitude && longitude !== seoulLongitude) {
            console.log("updating current place data");
            console.log(data);
            updateCurrentPlaceData(data);
          }
        })
        .catch((error) => {
          // Handle errors
          updateErrorMessage(
            "지오코딩 데이터를 가져오는 중 오류가 발생했습니다."
          );
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (place === "currentLocation") {
      console.log(currentPlaceData);
      //this is absurd.
      if (!currentPlaceData.administrativeArea) {
        updatePlaceData({
          latitude: seoulLatitude,
          longitude: seoulLongitude,
          administrativeArea: "Seoul",
          administrativeAreaKorean: "서울특별시",
          capitalNX: 60,
          capitalNY: 127,
          koreanName: "서울",
          midAreaNumber: "11B00000",
        });
      } else {
        updatePlaceData(currentPlaceData);
      }
    } else if (place) {
      // place가 정의되어 있는지 확인하는 가드 절 추가
      const locationData = CAPITAL_LOCATION.find(
        (capital) => capital.administrativeArea === place
      );
      if (locationData) {
        // locationData가 undefined가 아닌지 확인
        updatePlaceData(locationData);
      }
    }
  }, [place, currentPlaceData]);

  return (
    <>
      {currentPlaceData.administrativeArea ? (
        <span>
          현위치는{" "}
          {currentPlaceData?.administrativeAreaKorean &&
            currentPlaceData?.administrativeAreaKorean}{" "}
          {currentPlaceData?.area2 && currentPlaceData?.area2}{" "}
          {currentPlaceData?.area3 && currentPlaceData?.area3}
        </span>
      ) : (
        <p>
          기본 위치는 서울시 중구에요. 버튼을 눌러 현 위치의 정보를 확인할수
          있어요.
        </p>
      )}
    </>
  );
};

export default CurrentLocation;
