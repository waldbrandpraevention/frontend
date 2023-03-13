import Tile from "../../Tile";
import Card from "react-bootstrap/esm/Card";
import { useAdvancedStore } from "../../../stores/AdvancedStore";
import { useEvents } from "../../../utils/events";
import ErrorAlert from "../../alerts/ErrorAlert";
import LoadingTile from "../LoadingTile";
import { Carousel } from "react-bootstrap";
import { useBase64ImageFromApi } from "../../../utils/util";
import { useZones } from "../../../utils/zones";

const MyImage = (props: { image: number }) => {
  const imgsrc = useBase64ImageFromApi(
    "drones/get-event-image-raw/?event_id=" + props.image
  );
  return (
    <img
      style={{ width: "100%", maxHeight: "80%" }}
      src={imgsrc}
      alt="KI Einschätzung"
    />
  );
};

const DroneImage = () => {
  const id = useAdvancedStore((store) => store.id);
  const setId = useAdvancedStore((store) => store.setId);
  const { data: events, isLoading, isError } = useEvents();
  const { data: zones } = useZones();
  const handleSelect = (selectedIndex: number, e: any) => {
    setId(selectedIndex);
  };

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert>Drohnenbild konnte nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <Card.Title className="text-center">Drohnenbild</Card.Title>
      <Carousel activeIndex={id} onSelect={handleSelect}>
        {events.map((item) => (
          <Carousel.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MyImage image={item.id}></MyImage>
            </div>
            <Card.Text>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>Position</td>
                    <td>
                      Lat {item.lat}, Lon {item.lon}
                    </td>
                  </tr>
                  <tr>
                    <td>Zone</td>
                    <td>
                      {zones?.find((zone) => zone.id === item.zone_id)?.name}
                    </td>
                  </tr>
                  <tr>
                    <td>Zeitpunkt</td>
                    <td>{item.timestamp.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Text>
          </Carousel.Item>
        ))}
      </Carousel>
    </Tile>
  );
};

export default DroneImage;
