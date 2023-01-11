import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMapStore } from "../../service/stores";
import { useDebounce } from "../../utils/util";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

import "../../assets/styles/weather-icons.min.css"
import "../../assets/styles/weather-icons-wind.min.css"

/* date = 2023-01-10 format */
const getWeatherAPI = (center: [number, number], date: string) => {
  return `https://api.brightsky.dev/weather?lat=${center[0]}&lon=${center[1]}&date=${date}&tz=Europe/Berlin` /* using DWD API */
}

/* cloudy-night -> night-cloudy */
const fixCssClass = (name: string) => {
  let n = name;
  n = n.includes("-night") ? "night-" + n.substring(0, n.indexOf("-night")) : n
  n = n.includes("-day") ? "day-" + n.substring(0, n.indexOf("-day")) : n
  n = n.includes("-partly") ? n.replace("-partly", "") : n
  return n;
}

const WeatherForecast = () => {
  const center = useDebounce(useMapStore(state => state.center), 500) /* rate limit API call to every 500ms */

  const { data, isLoading, isError } = useQuery([center /* "weatherforecast" */], () => {
    return axios.get(getWeatherAPI(center, new Date().toISOString().split('T')[0])).then((e) => e.data);
  },);

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Wettervorhersage konnte nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      Lat: {center[0]}
      Lon: {center[1]}
      {/* Data: {JSON.stringify(data)} */}

      Wetterstationen: {data.sources.map((s: any) => `${s.station_name} (${s.distance}m), `)}

      <h4>TODO: hier kurze Wettervorhersage</h4>

      {/* {data.weather.map((v: any) => {
        return <div key={v.timestamp}>
          {new Date(v.timestamp).toLocaleString("de")}
          <i style={{ fontSize: "24px" }} className={`wi wi-${fixCssClass(v.icon)}`}></i>{v.icon}
          {v.temperature}
          {v.precipitation}
          {v.sunshine}
          {v.pressure_msl}
          {v.relative_humidity}
          {v.visibility}
          {v.wind_speed}
          <i style={{ fontSize: "24px" }} className={`wi wi-wind towards-${v.wind_direction}-deg`}></i> {v.wind_direction}
          {v.condition}
        </div>
      })} */}
    </Tile>
  );
};

export default WeatherForecast;
