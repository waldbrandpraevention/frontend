import { Card } from "react-bootstrap";
import { useMapStore } from "../../stores/MapStore";
import { useDrones } from "../../utils/drones";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const DroneCount = () => {
  const activeZone = useMapStore((state) => state.activeZone);

  const { data, isLoading, isError } = useDrones();

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Drohnen konnten nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <Card.Title className="text-center">Anzahl Drohnen</Card.Title>
      <div
        style={{
          fontSize: "xx-large",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.reduce((acc, current) => activeZone === -1 || current.zone_id === activeZone ? acc + 1 : 0, 0)}
      </div>
    </Tile>
  );
};

export default DroneCount;
