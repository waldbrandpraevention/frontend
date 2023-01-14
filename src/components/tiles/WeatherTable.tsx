import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";
import { useMapStore } from "../../service/stores";
import { useDebounce } from "../../utils/util";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import "../../assets/styles/weather-icons.min.css"
import "../../assets/styles/weather-icons-wind.min.css"
import { getWeatherAPI, fixCssClass } from "../../utils/weather";

const WeatherTable = () => {
  const center = useDebounce(useMapStore(state => state.center), 500) /* rate limit API call to every 500ms */

  const { data, isLoading, isError } = useQuery([center /* "WeatherTable" */], async () => {
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
  },);

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Wettervorhersage konnte nicht geladen werden.</ErrorAlert>;

  return (
    <Tile style={{ height: "100%", overflow: "scroll" }}>
      <Row>
        <Col md={2}>Lat: <b className="fw-semibold">{center[0]}</b></Col>
        <Col md={2}>Lon: <b className="fw-semibold">{center[1]}</b></Col>
        <Col>Wetterstationen <span className="fw-light">(Distanz)</span>: {data.today.sources.map((s: any) => <>
          <b className="fw-semibold">{s.station_name}</b> ({s.distance > 1000 ? (s.distance / 1000).toFixed(2) + "k" : s.distance}m), {" "}
        </>)}</Col>
      </Row>


      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Datum</th>
            <th>Wetter</th>
            <th>Temperatur (°C)</th>
            <th>Regen (mm)</th>
            <th>Sonne (h)</th>
            <th>Luftdruck (hPa)</th>
            <th>Luftfeuchtigkeit (%)</th>
            <th>Sichtbarkeit (m)</th>
            <th>Windgeschw. (km/h)</th>
            <th>Windrichtung (°)</th>
            <th>Kondition</th>
          </tr>
        </thead>
        <tbody>
          {data.today.weather.map((v: any) => {
            return <tr key={v.timestamp}>
              <td>{new Date(v.timestamp).toLocaleString("de")}</td>
              <td><i style={{ fontSize: "24px" }} className={`wi wi-${fixCssClass(v.icon)}`}></i>{v.icon}</td>
              <td>{v.temperature}</td>
              <td>{v.precipitation}</td>
              <td>{v.sunshine}</td>
              <td>{v.pressure_msl}</td>
              <td>{v.relative_humidity}</td>
              <td>{v.visibility > 5000 ? (v.visibility / 1000).toFixed(1) + " km" : v.visibility}</td>
              <td>{v.wind_speed}</td>
              <td><i style={{ fontSize: "24px" }} className={`wi wi-wind towards-${v.wind_direction}-deg`}></i> {v.wind_direction}</td>
              <td>{v.condition}</td>
            </tr>
          })}
        </tbody>
      </Table>


    </Tile>
  );
};

export default WeatherTable;
