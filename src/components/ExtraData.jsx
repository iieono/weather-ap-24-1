import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

function ExtraData() {
  const currentWeather = useSelector((state) => state.weather.current);
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex w-full flex-col text-white p-4 rounded-xl gap-2 bg-black bg-opacity-40">
        <div className="flex text-gray-300 items-center just gap-3 text-sm ">
          <FontAwesomeIcon icon={faTemperatureHigh} className="text-xl" />
          <p>UV INDEX</p>
        </div>
        <div>
          <p className="text-3xl font-salsa">{currentWeather?.current?.uvi}</p>
          <p className="text-sm">
            {typeof currentWeather?.current?.uvi === "number" && (
              <>
                {currentWeather?.current?.uvi <= 2 && "Low"}
                {currentWeather?.current?.uvi > 2 &&
                  currentWeather?.current?.uvi <= 5 &&
                  "Moderate"}
                {currentWeather?.current?.uvi > 5 &&
                  currentWeather?.current?.uvi <= 7 &&
                  "High"}
                {currentWeather?.current?.uvi > 7 &&
                  currentWeather?.current?.uvi <= 10 &&
                  "Very High"}
                {currentWeather?.current?.uvi > 10 && "Extreme"}
              </>
            )}
          </p>
        </div>
        <div className="container-uv w-full h-1.5 rounded-full">
          <div
            style={{
              width: `${(currentWeather?.current?.uvi / 11) * 100 + 2}%`,
            }}
            className="clean-width indicator-uv w-full h-full flex justify-end items-center relative"
            id="valueIndicator"
          >
            <div className="w-2.5 rounded-full border border-black right-0 h-2.5 bg-white"></div>
          </div>
        </div>
      </div>
      <div className="flex w-full text-white p-4 rounded-xl gap-2 bg-black bg-opacity-40">
        <div className="flex flex-col w-full gap-3">
          <div className="flex text-gray-300 items-center gap-3 text-sm ">
            <FontAwesomeIcon icon={faWind} className="text-xl" />
            <p>WIND</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-salsa">
              {currentWeather?.current?.wind_speed}
            </p>
            <div className="text-sm">
              <p className="text-gray-300">KMH</p>
              <p>Wind</p>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-full border-2 w-20 h-20 md:w-16 md:h-16 relative">
            <div className="absolute top-0 left-8 md:left-6 text-xs text-center">
              N
            </div>
            <div
              style={{
                transform: `rotate(${
                  currentWeather?.current?.wind_deg - 90
                }deg)`,
              }}
              className="clean-rotate absolute w-14 md:w-12 top-1/2 left-3 md:left-1.5 h-1 border border-black rounded-full half-white"
            >
              {" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtraData;
