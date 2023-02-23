import { Card, Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";
import { useArea } from "../../utils/area";
import { useMapStore } from "../../stores/MapStore";

const Area = () => {
  const activeArea = useMapStore(state => state.activeArea);
  const { data, isLoading, isError } = useArea();

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>

  return (
    <Tile>
      <Carousel variant="dark" style={{ height: "100%" }} indicators={false}>
        <Carousel.Item>
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
            <div style={{ float: "right", zIndex: 10, position: "inherit" }}>
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
        </Carousel.Item>
      </Carousel>
    </Tile>
  );
};

export default Area;
