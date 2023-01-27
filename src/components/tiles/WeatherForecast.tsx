import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMapStore } from "../../stores/MapStore";
import { useDebounce } from "../../utils/util";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import "../../assets/styles/weather-icons.min.css";
import "../../assets/styles/weather-icons-wind.min.css";
import { Card } from "react-bootstrap";
import { getWeatherAPI, fixCssClass } from "../../utils/weather";

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
      <Card.Title className="text-center mb-0">Wettervorhersage</Card.Title>
      <div className="d-flex justify-content-center">
        <b>
          Heute -{" "}
          {new Date(data.today.weather[0]?.timestamp).toLocaleDateString("de")}
        </b>
      </div>
      <div className="d-flex justify-content-evenly mb-2">
        <div className="d-flex-column border border-1 p-1 bg-light rounded">
          <div className="text-center">8:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[8]?.icon)}`}
            ></i>
          </div>
          <div className="text-center">
            {data.today.weather[8]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 rounded">
          <div className="text-center">11:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[11]?.icon)}`}
            ></i>
          </div>
          <div className="text-center">
            {data.today.weather[11]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 bg-light rounded">
          <div className="text-center">14:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[14]?.icon)}`}
            ></i>
          </div>
          <div className="text-center">
            {data.today.weather[14]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 rounded">
          <div className="text-center">18:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.today.weather[18]?.icon)}`}
            ></i>
          </div>
          <div className="text-center">
            {data.today.weather[18]?.temperature?.toFixed(0)}°C
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <b>
          Morgen -{" "}
          {new Date(data.tomorrow.weather[0]?.timestamp).toLocaleDateString(
            "de"
          )}
        </b>
      </div>
      <div className="d-flex justify-content-evenly mb-2">
        <div className="d-flex-column border border-1 p-1 bg-light rounded">
          <div className="text-center">8:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(data.tomorrow.weather[8]?.icon)}`}
            ></i>
          </div>
          <div className="text-center">
            {data.tomorrow.weather[8]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 rounded">
          <div className="text-center">11:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.tomorrow.weather[11]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.tomorrow.weather[11]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 bg-light rounded">
          <div className="text-center">14:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.tomorrow.weather[14]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.tomorrow.weather[14]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 rounded">
          <div className="text-center">18:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.tomorrow.weather[18]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.tomorrow.weather[18]?.temperature?.toFixed(0)}°C
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <b>
          Übermorgen -{" "}
          {new Date(data.overmorrow.weather[0]?.timestamp).toLocaleDateString(
            "de"
          )}
        </b>
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex-column border border-1 p-1 bg-light rounded">
          <div>
            <div className="text-center">8:00</div>
          </div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[8]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.overmorrow.weather[8]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 rounded">
          <div className="text-center">11:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[11]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.overmorrow.weather[11]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 bg-light rounded">
          <div className="text-center">14:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[14]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.overmorrow.weather[14]?.temperature?.toFixed(0)}°C
          </div>
        </div>
        <div className="d-flex-column border border-1 p-1 rounded">
          <div className="text-center">18:00</div>
          <div className="text-center">
            <i
              style={{ fontSize: "24px" }}
              className={`wi wi-${fixCssClass(
                data.overmorrow.weather[18]?.icon
              )}`}
            ></i>
          </div>
          <div className="text-center">
            {data.overmorrow.weather[18]?.temperature?.toFixed(0)}°C
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default WeatherForecast;
