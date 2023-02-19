import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";
import { useArea } from "../../utils/area";

const Area = () => {
  const { data, isLoading, isError } = useArea();

  if (isLoading) return <LoadingTile />;

  if (isError)
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
      <Card.Subtitle className="text-center">{data[0].zone_count} Zonen</Card.Subtitle>
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data[0].name}
      </div>
    </Tile>
  );
};

export default Area;
