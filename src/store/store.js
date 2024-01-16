import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/WeatherData'; 

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  }
});

export default store;
