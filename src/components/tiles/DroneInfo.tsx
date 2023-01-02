import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import {
  TbDrone,
  TbBatteryCharging,
  TbArrowBigRight,
  TbInfoSquare,
} from "react-icons/tb";

const DroneInfo = () => {
  const { data, isLoading, isError } = useQuery(["dronecount"], () => {
    return axios.get("/test?input=69").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Drohneninfos konnten nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      {" "}
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Hier können Sie den Akkustand und die Geschwindigkeit der für dieses
            Gebiet zuständigen Drohne einsehen.
          </Tooltip>
        }
      >
        <Button variant="light">
          <TbInfoSquare></TbInfoSquare>
        </Button>
      </OverlayTrigger>
      <Card.Title className="text-center">
        <TbDrone></TbDrone> Drohne
      </Card.Title>
      <div
        style={{
          fontSize: "large",
          textAlign: "center",
        }}
      >
        A123
      </div>
      <div
        style={{
          fontSize: "large",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Body>
          <p>
            <TbBatteryCharging></TbBatteryCharging>20%
          </p>
          <p>
            <TbArrowBigRight></TbArrowBigRight>15km/h
          </p>
          {data.message}
        </Card.Body>
      </div>
    </Tile>
  );
};

export default DroneInfo;
