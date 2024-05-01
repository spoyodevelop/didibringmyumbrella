import { create } from "zustand";

export const useWeatherStore = create((set) => ({
  place: "",
  latitude: "",
  longitude: "",
  placeData: {},
  weatherData: {},
  popData: {},
  currentPlaceData: {},
  currentWeatherData: {},

  updateCurrentPlaceData: (newCurrentData) =>
    set({ currentPlaceData: newCurrentData }),
  updateLatitude: (newLatitude) => set({ latitude: newLatitude }),
  updateLongitude: (newLongitude) => set({ longitude: newLongitude }),
  updatePlace: (newPlace) => set({ place: newPlace }),
  updatePlaceData: (placeData) => set({ placeData }),
  updateWeatherData: (weatherData) => set({ weatherData }),
  updatePopData: (popData) => set({ popData }),
}));
