import { Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";
import { TbInfoSquare } from "react-icons/tb";
import { useEvents } from "../../utils/events";
import { useMapStore } from "../../stores/MapStore";
import EventBadge from "../EventBadge";

const PotentialFiresite = () => {
  const activeEvent = useMapStore((state) => state.activeEvent);

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        Potentielle Brandstelle konnte nicht geladen werden.
      </ErrorAlert>
    );

  if (activeEvent === -1) return (
    <Tile style={{ background: "#e9ecef", userSelect: "none" }} classes="d-flex align-items-center justify-content-center flex-column text-center">
      <span> Wählen Sie ein <b>Event</b> aus um Informationen hier anzuzeigen.</span>
      <small className="fw-light mt-2"><b>Hovern</b> oder <b>klicken</b> Sie auf ein Event auf der Karte.</small>
    </Tile>
  )

  const event = data.find((e) => e.id === activeEvent);
  if (event === undefined) return <ErrorAlert>Kein Event ausgewählt.</ErrorAlert>;

  return (
    <Tile>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Zeigt die Koordinaten der potentiellen Brandstelle. Angezeigt werden
            die nördliche Breite, östliche Länge, die Höhenmeter und das
            Brandrisiko laut KI-Einschätzung (farblich hinterlegt). Diese Kachel
            wird nur angezeigt, wenn tatsächlich eine potentielle Brandstelle
            erkannt worden ist.
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
      <Table>
        <thead>
          <tr>
            <th>
              <Card.Title>Potentielle Brandstelle</Card.Title>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lat</td>
            <td>{event.lat}</td>
          </tr>
          <tr>
            <td>Lon</td>
            <td>{event.lon}</td>
          </tr>
          <tr>
            <td>Vertrauen?</td>
            <td>{event.confidence}%</td>
          </tr>
          <tr>
            <td>Typ</td>
            <td><EventBadge type={event.event_type}></EventBadge></td>
          </tr>
          <tr>
            <td>Brandrisiko:</td>
            <td>
              <DangerLevel level={event.confidence}></DangerLevel>
            </td>
          </tr>
        </tbody>
      </Table>
    </Tile>
  );
};

export default PotentialFiresite;
