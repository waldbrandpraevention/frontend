import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
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
  const { /* data, */ isLoading, isError } = useQuery(["droneinfo"], () => {
    return axios.get("/test?input=69").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Drohneninfos konnten nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      {" "}
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Hier können Sie den Akkustand und die Geschwindigkeit der für dieses
            Gebiet zuständigen Drohne einsehen.
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
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
          <div className="d-grid">
            <div className="col">
              <TbBatteryCharging></TbBatteryCharging>20%
            </div>
            <div className="col">
              <TbArrowBigRight></TbArrowBigRight>15km/h
            </div>
          </div>
        </Card.Body>
      </div>
    </Tile>
  );
};

export default DroneInfo;
