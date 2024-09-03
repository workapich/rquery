import React from "react";
import WeatherComponent from "./components/WeatherComponent";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App</h1>
      <WeatherComponent />
    </div>
  );
};

export default App;
