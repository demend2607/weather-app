import React, { useState } from "react";

import axios from "axios";
import { Oval } from "react-loader-spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import "./weather.scss";

interface WeatherData {
  wind?: {
    speed?: number;
  };
}

interface Weather {
  loading: boolean;
  data: WeatherData;
  error: string | null;
}

const Weather = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: null,
  });

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather?";
      const api_key = "83300600f36f30cc967b178de0499769";
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
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={inputHandler}
          onKeyPress={searchHandler}
        ></input>
      </div>
      <h2 className="city">{weather.data.name}</h2>
      <p className="toDate">{toDateFunction()}</p>
      <div className="icon">
        <img
          src={`https://openweathermap.org/img/wn/${
            !weather ? "04d" : weather.data.weather?.[0].icon
          }@2x.png`}
          alt={weather.data.weather?.[0].description}
        />
        <sup>
          {weather.data.main?.temp}&nbsp;
          <sup>o</sup>C
        </sup>
      </div>
      <div className="weather-wind">
        <p>Осадки: {weather.data.weather?.[0]?.description}</p>
        <p>Скорость ветра: {weather.data.wind?.speed} m/s</p>
      </div>
    </div>
  );
};
export default Weather;
