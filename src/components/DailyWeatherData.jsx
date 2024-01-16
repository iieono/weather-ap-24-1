import {
  faCloud,
  faDroplet,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";


import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import React from "react";
import MainWeatherIcon from "./MainWeatherIcon";

function DailyWeatherData() {
  const currentWeather = useSelector((state) => state.weather.current);

  return (
    <div className="rounded-xl shadow-xl p-1 h-full bg-stone-600 bg-opacity-40 flex flex-col">
      <div className="flex flex-col h-1/2 justify-center items-center gap-2 p-4">
        <div className="flex items-center justify-evenly w-full">
          <p className="text-5xl text-white font-bold font-salsa">
            {currentWeather?.current?.temp}°
          </p>
          <MainWeatherIcon
            condition={currentWeather?.current?.weather[0]?.main}
          />
        </div>
        <p className="text-sm text-white font-salsa">
          {currentWeather?.timezone}
        </p>
        <p className="text-2xl text-white font-salsa">
          {currentWeather?.current?.weather[0]?.main}
        </p>
        {currentWeather?.alerts &&
          currentWeather?.alerts?.map((alert) => (
            <p className="text-white text-sm">{alert.event}</p>
          ))}
      </div>
      <div className="h-1/2 p-2 gap-3 grid grid-cols-2">
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-stone-600 bg-opacity-60 max-w-1/2 backdrop-blur-sm">
          <div className="flex px-4 gap-3 text-gray-300 text-sm items-center">
            <FontAwesomeIcon icon={faTemperatureHigh} className="text-xl" />
            <p>FEELS LIKE</p>
          </div>
          <p className="px-4 text-3xl text-white font-salsa">
            {currentWeather?.current?.feels_like}°
          </p>
        </div>
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-stone-600 bg-opacity-60 max-w-1/2 backdrop-blur-sm">
          <div className="flex px-4 gap-1 md:gap-3 text-gray-300 text-sm items-center">
            <FontAwesomeIcon icon={faEye} className="text-xl" />
            <p>VISIBILITY</p>
          </div>
          <p className="px-4 text-3xl text-white font-salsa">
            {currentWeather?.current?.visibility}m
          </p>
        </div>
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-stone-600 bg-opacity-60 max-w-1/2 backdrop-blur-sm">
          <div className="flex px-4 gap-3 text-gray-300 text-sm items-center">
            <FontAwesomeIcon icon={faDroplet} className="text-xl" />
            <p>HUMIDITY</p>
          </div>
          <p className="px-4 text-3xl text-white font-salsa">
            {currentWeather?.current?.humidity}%
          </p>
        </div>
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-stone-600 bg-opacity-60 max-w-1/2 backdrop-blur-sm">
          <div className="flex px-4 gap-3 text-gray-300 text-sm items-center">
            <FontAwesomeIcon icon={faCloud} className="text-xl" />
            <p>CLOUDS</p>
          </div>
          <p className="px-4 text-3xl text-white font-salsa">
            {currentWeather?.current?.clouds}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyWeatherData;
