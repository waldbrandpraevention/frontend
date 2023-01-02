import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";
import { TbFlame, TbDropletFilled, TbInfoSquare } from "react-icons/tb";

const FireDetection = () => {
  const { data, isLoading, isError } = useQuery(["firerisk"], () => {
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
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Gemäß der gesammelten Daten wurde für diese Zone Rauch und/oder
            Feuer detektiert. 1= sehr geringe Gefahr bis 5 = sehr hohe Gefahr.
          </Tooltip>
        }
      >
        <Button variant="light">
          <TbInfoSquare></TbInfoSquare>
        </Button>
      </OverlayTrigger>
      <Card.Body>
        <Card.Title>
          <TbDropletFilled></TbDropletFilled>Rauch detektiert:
          <DangerLevel level={2}></DangerLevel>
        </Card.Title>
        <Card.Title>
          <TbFlame></TbFlame>Feuer detektiert:
          <DangerLevel level={3}></DangerLevel>
        </Card.Title>
      </Card.Body>
      {data.message}
    </Tile>
  );
};

export default FireDetection;
