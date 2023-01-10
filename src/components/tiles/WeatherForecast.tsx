import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Card } from "react-bootstrap";
import { TbSun, TbCloudRain, TbCloudSnow } from "react-icons/tb";
import ErrorAlert from "../alerts/ErrorAlert";

import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const curr = new Date();
const today = `${curr.getDate()}.${curr.getMonth() + 1}.${curr.getFullYear()}`;
const tomorrow = `${curr.getDate() + 1}.${
  curr.getMonth() + 1
}.${curr.getFullYear()}`;
const dat = `${curr.getDate() + 2}.${
  curr.getMonth() + 1
}.${curr.getFullYear()}`;

const WeatherForecast = () => {
  const { data, isLoading, isError } = useQuery(["weatherforecast"], () => {
    return axios.get("/test?input=Alles%20sonnig").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert> Wettervorhersage konnte nicht geladen werden.</ErrorAlert>
    );

  return (
    <Tile>
      <Card.Title className="text-center">Wettervorhersage</Card.Title>
      <br />
      <div
        style={{
          fontSize: "large",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Heute - {today}
      </div>
      <div
        style={{
          fontSize: "large",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Body>
          <p>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "xx-large",
                }}
              >
                <TbSun></TbSun>
              </div>
              {data.message}
            </div>
          </p>
        </Card.Body>
      </div>

      <div
        style={{
          fontSize: "large",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Morgen - {tomorrow}
      </div>
      <div
        style={{
          fontSize: "large",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Body>
          <p>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "xx-large",
                }}
              >
                <TbCloudRain></TbCloudRain>
              </div>
              {data.message}
            </div>
          </p>
        </Card.Body>
      </div>

      <div
        style={{
          fontSize: "large",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Übermorgen - {dat}
      </div>
      <div
        style={{
          fontSize: "large",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Body>
          <p>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "xx-large",
                }}
              >
                <TbCloudSnow></TbCloudSnow> 7°
              </div>
              {data.message}
            </div>
          </p>
        </Card.Body>
      </div>
    </Tile>
  );
};

export default WeatherForecast;
