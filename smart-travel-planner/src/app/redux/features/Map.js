import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    start: null,
    destination: null,
    stops: [],
  },
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload.start;
    },

    setDestination: (state, action) => {
      state.destination = action.payload.destination;
    },

    setStops: (state, action) => {
      state.stops = action.payload.stops;
    },

    addStop: (state, action) => {
      if (action.payload.stop in state.stops) return;
      state.stops = [...state.stops, action.payload.stop];
    },

    removeStop: (state, action) => {
      state.stops = [
        ...state.stops.slice(0, action.payload.index),
        ...state.stops.slice(action.payload.index + 1),
      ];
    },
  },
});

export const {
  setStart,
  setDestination,
  setStops,
  addStop,
  removeStop,
} = mapSlice.actions;

export const selectStart = (state) => state.map.start;
export const selectDestination = (state) => state.map.destination;
export const selectStops = (state) => state.map.stops;

export default mapSlice.reducer;
