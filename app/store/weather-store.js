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
  systemMessage: {
    status: "",
    message: "",
    idCounter: 0,
  },
  isInit: false,
  updateIsInit: (newIsInit) => set({ isInit: newIsInit }),
  updateSystemMessage: (newSystemMessage) => {
    set((state) => ({
      // Generate a unique ID for the new system message
      systemMessage: {
        ...newSystemMessage,

        idCounter: state.systemMessage.idCounter + 1,
      },
    }));
  },
  updateErrorMessage: (newErrorMessage) =>
    set({ errorMessage: newErrorMessage }),
  updateCurrentPlaceData: (newCurrentData) =>
    set({ currentPlaceData: newCurrentData }),
  updateLatitude: (newLatitude) => set({ latitude: newLatitude }),
  updateLongitude: (newLongitude) => set({ longitude: newLongitude }),
  updatePlace: (newPlace) => set({ place: newPlace }),
  updatePlaceData: (placeData) => set({ placeData }),
  updateWeatherData: (weatherData) => set({ weatherData }),
  updatePopData: (popData) => set({ popData }),
}));
