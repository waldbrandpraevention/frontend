import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";
import { TbFlame, TbDropletFilled, TbInfoSquare } from "react-icons/tb";

const FireDetection = () => {
  const { /* data ,*/ isLoading, isError } = useQuery(["firedetect"], () => {
    return axios.get("/test?input=69").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        {" "}
        Rauch- und Feuerdetektion konnte nicht geladen werden.
      </ErrorAlert>
    );

  return (
    <Tile>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Gemäß der gesammelten Daten wurde für diese Zone Rauch und/oder
            Feuer detektiert. 1= sehr geringe Gefahr bis 5 = sehr hohe Gefahr.
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
      <Card.Subtitle>
        <TbDropletFilled></TbDropletFilled>Rauch detektiert:
        <DangerLevel level={2}></DangerLevel>
      </Card.Subtitle>
      <Card.Subtitle>
        <TbFlame></TbFlame>Feuer detektiert:
        <DangerLevel level={3}></DangerLevel>
      </Card.Subtitle>
    </Tile>
  );
};

export default FireDetection;
