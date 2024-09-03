import React, { useState } from "react";
import useWeather from "../lib/useWeather"; // Adjust the path accordingly

const WeatherComponent = () => {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Only fetch weather if either coordinates or a full city name is provided
  const { data, isLoading, error } = useWeather(coords || { city: searchCity });

  const getLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoadingLocation(false);
        setSearchCity(""); // Clear search city if location is used
      },
      (error) => {
        console.error(error);
        setLoadingLocation(false);
      }
    );
  };

  const handleSearch = () => {
    if (city.length > 0) {
      setCoords(null); // Reset coords if searching by city
      setSearchCity(city);
    }
  };

  if (loadingLocation) return <p>Fetching location...</p>;
  if (isLoading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        <button onClick={getLocation}>Get Weather by Location</button>
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {data && (
        <div>
          <h2>Weather in {data.name}</h2>
          <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
          <p>Condition: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
