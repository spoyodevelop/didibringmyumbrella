import { create } from "zustand";

export const useWeatherStore = create((set) => ({
  place: "",
  latitude: "",
  longitude: "",
  placeData: {},
  weatherData: {},
  popData: {},
  currentData: {},
  currentPlaceData: {},
  currentWeatherData: {},
  updateCurrentWeatherData: (newCurrentWeatherData) =>
    set({ currentWeatherData: newCurrentWeatherData }),
  updateCurrentPlace: (newCurrentPlace) =>
    set({ currentPlace: newCurrentPlace }),
  updateCurrentPlaceData: (newCurrentPlaceData) =>
    set({ currentPlaceData: newCurrentPlaceData }),
  updateCurrentData: (newCurrentData) => set({ currentData: newCurrentData }),
  updateLatitude: (newLatitude) => set({ latitude: newLatitude }),
  updateLongitude: (newLongitude) => set({ longitude: newLongitude }),
  updatePlace: (newPlace) => set({ place: newPlace }),
  updatePlaceData: (placeData) => set({ placeData }),
  updateWeatherData: (weatherData) => set({ weatherData }),
  updatePopData: (popData) => set({ popData }),
}));
