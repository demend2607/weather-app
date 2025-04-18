import { ChangeEvent, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faFrown, faEarthEurope, faEarthAfrica } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../shared/spinner/Spinner";
import "./weather.scss";

interface WeatherData {
  wind?: {
    speed: number;
  };
  main?: {
    temp: number;
  };
  name?: string;
  weather?: {
    icon: string;
    description: string;
  }[];
}

interface Weather {
  loading: boolean;
  data: WeatherData;
  error: boolean | null;
}

const Weather = () => {
  const [input, setInput] = useState<string>("");
  const [weather, setWeather] = useState<Weather>({
    loading: false,
    data: {} as WeatherData,
    error: null,
  });

  const toDateFunction = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const WeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  console.log("777", import.meta.env.VITE_API_WEATHER);

  const searchHandler = async (e) => {
    if (e.key === "Enter" || !e.key) {
      e.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather?";
      const api_key = import.meta.env.VITE_API_WEATHER;
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
            lang: "ru",
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
    }
  };
  console.log("weather", weather);

  return (
    <div className="application">
      <h1 className="h1">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className={`city-search ${input ? "has-content" : ""}`}
          placeholder=""
          name="query"
          value={input}
          onChange={inputHandler}
          onKeyPress={searchHandler}
        />
        <label>Enter city name...</label>
        <button onClick={searchHandler}>
          <FontAwesomeIcon icon={input ? faEarthAfrica : faEarthEurope} />
        </button>
      </div>
      {weather.loading && <Spinner />}
      {weather.error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: "20px" }}> City not found</span>
        </div>
      )}
      {weather && weather.data && weather.data.main && (
        <div className="weather-body">
          <h2 className="city">{weather.data?.name}</h2>
          <p className="toDate">{toDateFunction()}</p>
          <div className="icon">
            <img
              src={`https://openweathermap.org/img/wn/${!weather.data.weather?.[0].icon ? "01d" : weather.data.weather?.[0].icon}@2x.png`}
              alt={weather.data.weather?.[0].description}
            />
            <p className="weather-temp">
              <sup>
                {!weather.data.main?.temp ? 0 : weather.data.main?.temp}&nbsp;
                <sup>o</sup>C
              </sup>
            </p>
          </div>
          <div className="weather-wind">
            <p>
              Осадки: <span>{weather.data.weather?.[0].description}</span>
            </p>
            <p>
              Скорость ветра <FontAwesomeIcon icon={faWind} />: <span>{weather.data.wind?.speed} m/s</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Weather;
