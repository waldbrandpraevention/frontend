import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";
import DangerLevel from "../DangerLevel";
import { refetchInterval } from "../../config/config";

const Firerisk = () => {
  const { /* data ,*/ isLoading, isError } = useQuery(["firerisk"], () => {
    return axios.get("/test?test_input=420").then((e) => e.data);
  }, { refetchInterval });

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
        className="mt-1"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DangerLevel level={/* parseInt(data.message) */1} />
      </div>
    </Tile>
  );
};

export default Firerisk;
