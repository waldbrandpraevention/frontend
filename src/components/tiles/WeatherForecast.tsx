import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMapStore } from "../../service/stores";
import { useDebounce } from "../../utils/util";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

import "../../assets/styles/weather-icons.min.css";
import "../../assets/styles/weather-icons-wind.min.css";
import { Card } from "react-bootstrap";

/* date = 2023-01-10 format */
const getWeatherAPI = (center: [number, number], date: string) => {
  return `https://api.brightsky.dev/weather?lat=${center[0]}&lon=${center[1]}&date=${date}&tz=Europe/Berlin`; /* using DWD API */
};

/* cloudy-night -> night-cloudy */
const fixCssClass = (name: string) => {
  let n = name;
  n = n.includes("-night") ? "night-" + n.substring(0, n.indexOf("-night")) : n;
  n = n.includes("-day") ? "day-" + n.substring(0, n.indexOf("-day")) : n;
  n = n.includes("-partly") ? n.replace("-partly", "") : n;
  return n;
};

const WeatherForecast = () => {
  const center = useDebounce(
    useMapStore((state) => state.center),
    500
  ); /* rate limit API call to every 500ms */

  const { data, isLoading, isError } = useQuery(
    [center /* "weatherforecast" */],
    async () => {
      const d = new Date();
      const today = await axios
        .get(getWeatherAPI(center, d.toISOString().split("T")[0]))
        .then((e) => e.data);
      d.setDate(d.getDate() + 1);
      const tomorrow = await axios
        .get(getWeatherAPI(center, d.toISOString().split("T")[0]))
        .then((e) => e.data);
      d.setDate(d.getDate() + 1);
      const overmorrow = await axios
        .get(getWeatherAPI(center, d.toISOString().split("T")[0]))
        .then((e) => e.data);
      return { today, tomorrow, overmorrow };
    }
  );

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert> Wettervorhersage konnte nicht geladen werden.</ErrorAlert>
    );

  return (
    <Tile>
      <Card.Title className="text-center">Wettervorhersage</Card.Title>
      {/*Lat: {center[0]}
      <br />
      Lon: {center[1]}
      <br />
      <br />
      {/* Data: {JSON.stringify(data)} 
      Wetterstationen: <br />
      {data.sources.map(
        (s: any) => `${s.station_name} (${s.distance}m), `
      )}{" "}
      <br />*/}
      <div className="d-flex justify-content-center">
        <b>
          Heute -
          {new Date(data.today.weather[0].timestamp).toLocaleDateString("de")}
        </b>
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex-column">
          <div className="fontSize: small">8:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[8].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.today.weather[8].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">11:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[11].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.today.weather[11].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">14:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[14].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.today.weather[14].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">18:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[18].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.today.weather[18].temperature.toFixed(0)}°C
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <b>
          Morgen -
          {new Date(data.tomorrow.weather[0].timestamp).toLocaleDateString(
            "de"
          )}
        </b>
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex-column">
          <div className="fontSize: small">8:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.tomorrow.weather[8].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.tomorrow.weather[8].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">11:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.tomorrow.weather[11].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.tomorrow.weather[11].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">14:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.tomorrow.weather[14].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.tomorrow.weather[14].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">18:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.tomorrow.weather[18].icon)}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.tomorrow.weather[18].temperature.toFixed(0)}°C
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <b>
          Übermorgen -
          {new Date(data.overmorrow.weather[0].timestamp).toLocaleDateString(
            "de"
          )}
        </b>
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex-column">
          <div>
            <div className="fontSize: small">8:00</div>
          </div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[8].icon
              )}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.overmorrow.weather[8].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">11:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[11].icon
              )}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.overmorrow.weather[11].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">14:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[14].icon
              )}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.overmorrow.weather[14].temperature.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column">
          <div className="fontSize: small">18:00</div>
          <div>
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[18].icon
              )}`}
            ></i>
          </div>
          <div className="fontSize: small">
            {data.overmorrow.weather[18].temperature.toFixed(0)}°C
          </div>
        </div>
      </div>

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
