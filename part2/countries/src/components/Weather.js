import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [capital]);
  if (weather.current) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <b>temperature:</b> {weather.current.temperature} Celcius
        <div>
          <img alt="weather" src={weather.current.weather_icons[0]} />
        </div>
        <b>wind:</b> {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Weather;
