import {
  faBolt,
  faCloud,
  faCloudRain,
  faSmog,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainWeatherIcon = ({ condition }) => {
  let icon;

  switch (condition?.toLowerCase()) {
    case "clear":
      icon = <FontAwesomeIcon icon={faSun} className="text-4xl text-white" />;
      break;
    case "clouds":
      icon = <FontAwesomeIcon icon={faCloud} className="text-4xl text-white" />;
      break;
    case "rain":
      icon = (
        <FontAwesomeIcon icon={faCloudRain} className="text-4xl text-white" />
      );
      break;
    case "snow":
      icon = (
        <FontAwesomeIcon icon={faSnowflake} className="text-4xl text-white" />
      );
      break;
    case "thunderstorm":
      icon = <FontAwesomeIcon icon={faBolt} className="text-4xl text-white" />;
      break;
    case "drizzle":
      icon = (
        <FontAwesomeIcon icon={faCloudRain} className="text-4xl text-white" />
      );
      break;
    case "mist":
    case "fog":
      icon = <FontAwesomeIcon icon={faSmog} className="text-4xl text-white" />;
      break;
    default:
      icon = <FontAwesomeIcon icon={faSun} className="text-4xl text-white" />;
  }

  return <div>{icon}</div>;
};

export default MainWeatherIcon;
