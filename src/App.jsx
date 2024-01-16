import { useEffect, useState } from "react";
import WeeklyWeatherData from "./components/WeeklyWeatherData";
import DailyWeatherData from "./components/DailyWeatherData";
import HourlyWeatherData from "./components/HourlyWeatherData";
import ExtraData from "./components/ExtraData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentWeather } from "./store/slices/WeatherData";
// import MapComponent from './components/GoogleMap'

function App() {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getLocalLocation();
    getWeatherData();
    initMap();
  }, []);

  const initMap = () => {
    const myLatlng = { lat: 41.3106176, lng: 69.2518912 };
    const mapContainer = document.getElementById("map");
    const map = new google.maps.Map(mapContainer, {
      zoom: 4,
      center: myLatlng,
    });
    const marker = new google.maps.Marker({
      position: myLatlng,
      map,
      title: "Click to zoom",
    });
    marker.addListener("click", () => {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
      getWeatherData(marker.getPosition().lat(), marker.getPosition().lng());
      if (mapContainer.requestFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      } else if (mapContainer.mozRequestFullScreen) {
        if (document.mozFullScreen) {
          document.mozCancelFullScreen();
        }
      } else if (mapContainer.webkitRequestFullscreen) {
        if (document.webkitIsFullScreen) {
          document.webkitExitFullscreen();
        }
      } else if (mapContainer.msRequestFullscreen) {
        if (document.msFullscreenElement) {
          document.msExitFullscreen();
        }
      }
    });
    google.maps.event.addListener(map, "click", (event) => {
      marker.setPosition(event.latLng);
    });
  };

  const getLocalLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const getCoordinates = async () => {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, function async(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        getWeatherData(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
        );
      }
    });
  };

  const getWeatherData = async (latt, longg) => {
    const lat = latt || latitude || 41.3106176;
    const long = longg || longitude || 69.2518912;

    const config = {
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=API_KEY`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      dispatch(setCurrentWeather(response.data));
      setLocation(response.data.timezone);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div
      id="container-main"
      className="bg-stone-500 min-h-screen w-screen p-2 md:p-5 flex flex-col md:flex-row md:overflow-hidden"
    >
      <div className="flex flex-col p-5 gap-3 w-full xl:w-1/3 h-full ">
        <nav className="rounded-full bg-stone-600 flex items-center gap-2 px-5 py-1 text-gray-300">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-lg text-gray-300 cursor-pointer"
          />
          <input
            className="px-3 py-1 w-full text-sm bg-transparent"
            type="text"
            placeholder={location || "Location"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <FontAwesomeIcon
            icon={faSearch}
            className=" text-lg text-gray-300 cursor-pointer"
            onClick={getCoordinates}
          />
        </nav>
        <DailyWeatherData />
        <div id="map" className="rounded-xl h-40 w-full"></div>
      </div>
      <div className="flex flex-col p-5 gap-3 w-full xl:w-2/3 overflow-hidden relative">
        <HourlyWeatherData />
        <WeeklyWeatherData />
        <ExtraData />
      </div>
    </div>
  );
}

export default App;
