import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";

const Area = () => {
  const { data, isLoading, isError } = useQuery(["area"], () => {
    return axios.get("/test?input=Südliches%20Brandenburg").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>
    );

  return (
    <Tile>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Zeigt das (gemäß Kartenausschnitt) momentan betrachtete Gebiet.
            Bewegen Sie die Karte, um das angezeigte Überwachungsgebiet zu
            wechseln.
          </Tooltip>
        }
      >
        <Button variant="light">
          <TbInfoSquare></TbInfoSquare>
        </Button>
      </OverlayTrigger>
      <Card.Title className="text-center">Überwachungsgebiet</Card.Title>
      <Card.Subtitle className="text-center">6 Zonen</Card.Subtitle>
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

export default Area;
