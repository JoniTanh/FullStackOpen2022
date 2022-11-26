import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_URL = "http://api.weatherstack.com/current";

const CurrentWeather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState([""]);
  const finalUrl =
    WEATHER_URL + "?access_key=" + API_KEY + "&query=" + capital + "&units=m";

  useEffect(() => {
    axios.get(finalUrl).then((response) => {
      setWeatherData(response.data);
    });
  }, [finalUrl]);

  return (
    <>
      {weatherData ? (
        <div>
          {capital ? (
            <>
              <h1>Weather in {capital}</h1>
              <p>temperature {weatherData?.current?.temperature} Celcius</p>
              <img alt="weather" src={weatherData?.current?.weather_icons[0]} />
              <p>wind {weatherData?.current?.wind_speed} m/s</p>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <>""</>
      )}
    </>
  );
};

export default CurrentWeather;
