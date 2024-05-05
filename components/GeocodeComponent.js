"use client";
import React, { useState, useEffect, useRef } from "react";
import { useWeatherStore } from "@/app/store/weather-store";
import { seoulLatitude, seoulLongitude } from "@/util/locations";

const GeocodeComponent = () => {
  const {
    latitude,
    longitude,
    currentPlaceData,
    updateLatitude,
    updateLongitude,
    updateSystemMessage,
    updateIsInit,
    updateCurrentPlaceData,
    updatePlace,
    systemMessage: { status: systemStatus, message: systemMessage },
  } = useWeatherStore();
  const fetchingData = useRef(false); // useRef to track if data fetching is in progress

  const fetchData = async () => {
    console.log("위치정보를 가져옵니다.");
    console.log(fetchingData.current);

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // updateSystemMessage({
            //   status: "info",
            //   message: "이미 위치정보를 가져왔습니다.",
            // });

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateCurrentPlaceData({ latitude, longitude });
            updateLatitude(latitude);
            updateLongitude(longitude);
            updateIsInit(false);
            updatePlace("currentLocation");

            updateSystemMessage({
              status: "success",
              message: "현재 위치정보를 가져왔습니다.",
            });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            // If user rejects geolocation, set location to Seoul
            console.log("user reject geolocation");
            updateSystemMessage({
              status: "error",
              message: "위치정보를 가져올수 없습니다. 위치정보를 허용해주세요.",
            });

            updateLatitude(seoulLatitude);
            updateLongitude(seoulLongitude);

            updateIsInit(false);

            // Set error message
            // Example: updateErrorMessage("Geolocation permission denied. Defaulting to Seoul.");
          }
        );
      } else {
        console.error("위치정보를 가져오는 중 오류가 발생했습니다.");
        // Set error message
        // Example: updateErrorMessage("Geolocation is not supported by this browser.");
        updateSystemMessage({
          status: "error",
          message:
            "위치정보를 가져오는 중 오류가 발생했습니다. 이 브라우저는 위치정보를 지원하지 않아요.",
        });
        updateIsInit(false);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      updateSystemMessage({
        status: "error",
        message: "알수 없는 오류가 발생했습니다. 새로고침을 해주세요.",
      });
      updateIsInit(false);
      // Set error message
      // Example: updateErrorMessage("An error occurred while fetching geolocation.");
    }
  };

  const fetchDatafromSeoul = async () => {
    if (!fetchingData.current) {
      // Check if data fetching is already in progress
      fetchingData.current = true; // Set to true to prevent multiple fetch calls

      try {
        const seoulLatitude = 37.5665;
        const seoulLongitude = 126.978;

        updateLatitude(seoulLatitude);
        updateLongitude(seoulLongitude);
        fetchingData.current = false; // Reset to false after data fetch completes
        updateSystemMessage({
          status: "",
          message: "",
        });
        updateIsInit(true);
      } catch (error) {
        console.error("Error sending data:", error);
        updateSystemMessage({
          status: "error",
          message: "알수 없는 오류가 발생했습니다. 페이지를 새로고침 해주세요.",
        });
        // Set error message
        // Example: updateErrorMessage("An error occurred while fetching geolocation.");
        fetchingData.current = false; // Reset to false if an error occurs
      }
    }
  };

  useEffect(() => {
    fetchDatafromSeoul();
  }, []); // Fetch data on component mount

  const handleClick = () => {
    fetchData(); // Fetch data when button is clicked
  };

  return (
    <button className="btn btn-primary btn-m" onClick={handleClick}>
      현위치는?
    </button>
  );
};

export default GeocodeComponent;
