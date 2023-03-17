import { Card, Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import {
  TbDrone,
  TbBatteryCharging,
  TbArrowBigRight,
  TbInfoSquare,
} from "react-icons/tb";
import { useDrones } from "../../utils/drones";
import { useAdvancedStore } from "../../stores/AdvancedStore";
import { useEvents } from "../../utils/events";

const DroneInfo = () => {
  const { data: drones, isLoading: dronesisLoading, isError: dronesisError } = useDrones();
  const { data: eventData, isLoading: eventIsLoading, isError: eventIsError } = useEvents();
  const activeEvent = useAdvancedStore((state) => state.id);
  const setId = useAdvancedStore(store => store.setId);
  const handleSelect = (selectedIndex: number, e: any) => {
    setId(selectedIndex);
  };

  if (dronesisLoading || eventIsLoading) return <LoadingTile />;

  if (dronesisError || eventIsError)
    return <ErrorAlert> Drohneninfos konnten nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <Carousel indicators={false} variant="dark" activeIndex={activeEvent} onSelect={handleSelect}>
        {eventData.map((event) => {
          const drone = drones.find(d => event.drone_id === d.drone_id)!;
          return (
            <Carousel.Item>
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="icontooltip">
                  Hier können Sie den verbleibenden Akkustand in Minuten und die verbleibende Flugreichweite in km der für dieses
                  Gebiet zuständigen Drohne einsehen.
                </Tooltip>}
              >
                <div style={{ float: "right", zIndex: 10, position: "inherit" }}>
                  <TbInfoSquare></TbInfoSquare>
                </div>
              </OverlayTrigger>
              <Card.Title className="text-center">
                <TbDrone></TbDrone> Drohne #{drone.drone_id}
              </Card.Title>
              <div
                style={{
                  fontSize: "large",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Body className="pt-0">
                  <div className="d-grid text-center">
                    <div className="col">
                      <TbBatteryCharging></TbBatteryCharging>{drone.flight_time.toFixed(0)} min
                    </div>
                    <div className="col">
                      <TbArrowBigRight></TbArrowBigRight>{drone.flight_range.toFixed(2)} km
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Tile>
  );
};

export default DroneInfo;
