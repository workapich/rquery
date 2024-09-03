import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWeather = async ({ queryKey }) => {
  const [_, params] = queryKey;
  const { lat, lon, city } = params || {};

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  let url = "";

  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  } else {
    return null;
  }

  const { data } = await axios.get(url);
  return data;
};

const useWeather = (params) => {
  return useQuery({
    queryKey: ["weather", params],
    queryFn: fetchWeather,
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });
};

export default useWeather;
