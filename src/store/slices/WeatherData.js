import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    latData: null,
    longData: null,
    current: null,
  },
  reducers: {
    setCurrentWeather: (state, action) => {
      return { ...state, current: action.payload };
    },
  },
});

export const { setCurrentWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
