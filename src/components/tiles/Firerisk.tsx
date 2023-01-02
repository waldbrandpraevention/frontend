import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";

const Firerisk = () => {
  const { data, isLoading, isError } = useQuery(["firerisk"], () => {
    return axios.get("/firerisk").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Brandrisiko konnte nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Zeigt die Waldbrandgefahr des betrachteten Überwachungsgebietes in 5
            Gefahrenstufen an: 1 = sehr geringe Gefahr bis 5 = sehr hohe Gefahr.
          </Tooltip>
        }
      >
         <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
      <Card.Title className="text-center">Brandrisiko</Card.Title>
      <Card.Subtitle className="text-center">gemäß DWD Stufen</Card.Subtitle>
      <div
        style={{
          fontSize: "x-large",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.message}
      </div>
    </Tile>
  );
};

export default Firerisk;
