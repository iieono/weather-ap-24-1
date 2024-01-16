import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';
import WeatherIcon from "./WeatherIcon"

function WeeklyWeatherData() {
  const currentWeather = useSelector((state) => state.weather.current);
  return (
    <div className='rounded-xl shadow-xl p-4 w-full bg-black bg-opacity-40 flex flex-col gap-3'>
      <div className='flex items-center gap-3 text-gray-300 text-sm '>
       <FontAwesomeIcon icon={faCalendarWeek} className="text-lg" />
        <p>WEEKLY FORECAST</p>
      </div>
      <hr/>
      <div className='time-scroll text-white flex py-4 gap-3 w-full overflow-auto'>
        {currentWeather?.daily && currentWeather?.daily?.map((data, index)=>{
          const timestamp = data.dt;
          const datee = new Date(timestamp * 1000);
          const dayOfMonth = datee.getDate();
          const monthNumber = datee.getMonth() + 1;

          return(
            <div className={`rounded-xl ${index === 0 ?"bg-stone-600":"hover:bg-stone-600"} p-2 px-4 flex flex-col items-center`}>
          <p className='text-xs'>{index === 0 ? 'Today' : `${dayOfMonth} / ${monthNumber}`}</p>
          <p className='text-lg font-salsa'>{data?.temp?.day}°</p>
          <WeatherIcon condition={data?.weather[0]?.main} />
        </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeeklyWeatherData
