import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";
import { TbFlame, TbDropletFilled, TbInfoSquare } from "react-icons/tb";
import { useFirerisk, useZones } from "../../utils/zones";
import { useMapStore } from "../../stores/MapStore";

const FireDetection = () => {
  const { data, isLoading, isError } = useZones();
  const zoneId = useMapStore(state => state.activeZone);

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        Rauch- und Feuerdetektion konnte nicht geladen werden.
      </ErrorAlert>
    );

  const zone = data.find(z => z.id === zoneId);
  if (!zone) return <ErrorAlert>Keine Zone ausgewählt.</ErrorAlert>;

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
        <DangerLevel level={zone.ai_smoke_detection}></DangerLevel>
      </Card.Subtitle>
      <Card.Subtitle>
        <TbFlame></TbFlame>Feuer detektiert:
        <DangerLevel level={zone.ai_fire_detection}></DangerLevel>
      </Card.Subtitle>
    </Tile>
  );
};

export default FireDetection;
