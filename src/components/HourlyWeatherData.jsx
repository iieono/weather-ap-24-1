import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import WeatherIcon from "./WeatherIcon";

function HourlyWeatherData() {
  const currentWeather = useSelector((state) => state.weather.current);
  return (
    <div className="rounded-xl shadow-xl p-4 max-w-full bg-black bg-opacity-40 flex flex-col gap-3 ">
      <div className="flex items-center gap-3 text-gray-300 text-sm ">
        <FontAwesomeIcon icon={faClock} className="text-lg" />
        <p>HOURLY FORECAST</p>
      </div>
      <hr />
      <div className="time-scroll text-white flex py-4 gap-2 w-full overflow-auto">
        {currentWeather?.hourly &&
          currentWeather?.hourly?.map((data, index) => {
            const timestamp = data.dt;
            const datee = new Date(timestamp * 1000);
            const hour = datee.getHours();
            return (
              <div
                className={`rounded-xl ${
                  index === 0 ? "bg-stone-600" : "hover:bg-stone-600"
                } p-2 px-4 flex flex-col items-center`}
              >
                <p className="text-sm">{index === 0 ? "Now" : `${hour}:00`}</p>
                <p className="text-lg font-salsa">{data?.temp}°</p>
                <WeatherIcon condition={data?.weather[0]?.main} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HourlyWeatherData;
