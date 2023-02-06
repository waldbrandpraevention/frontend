import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";
import { useZones } from "../../utils/zones";

const Area = () => {
  const { data: zonesData, isLoading: isLoadingZone, isError: isErrorZone } = useZones()

  const { data, isLoading, isError } = useQuery(["area"], () => {
    return axios.get("/test?test_input=Südliches%20Brandenburg").then((e) => e.data);
  });

  if (isLoading || isLoadingZone) return <LoadingTile />;

  if (isError || isErrorZone)
    return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>

  return (
    <Tile>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Zeigt das (gemäß Kartenausschnitt) momentan betrachtete Gebiet.
            Bewegen Sie die Karte, um das angezeigte Überwachungsgebiet zu
            wechseln.
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
      <Card.Title className="text-center">Überwachungsgebiet</Card.Title>
      <Card.Subtitle className="text-center">{zonesData.length} Zonen</Card.Subtitle>
      <div
        style={{
          // fontSize: "x-large",
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
