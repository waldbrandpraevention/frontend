import Tile from "../../Tile";
import Card from "react-bootstrap/esm/Card";
import Carousel from "react-bootstrap/Carousel";
import Annotorious from "./Annotorious";
import { useAdvancedStore } from "../../../stores/AdvancedStore";
import { useEvents } from "../../../utils/events";
import ErrorAlert from "../../alerts/ErrorAlert";
import LoadingTile from "../LoadingTile";
import { useZones } from "../../../utils/zones";

const AiImage = () => {
  const id = useAdvancedStore((store) => store.id);
  const setId = useAdvancedStore((store) => store.setId);
  const { data: events, isLoading, isError } = useEvents();
  const { data: zones } = useZones();
  const handleSelect = (selectedIndex: number, e: any) => {
    setId(selectedIndex);
  };

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert>KI Bild konnte nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <Card.Title className="text-center">KI Einschätzung</Card.Title>
      <Carousel activeIndex={id} onSelect={handleSelect}>
        {events.map((item) => (
          <Carousel.Item>
            <Annotorious image={item.id} />
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
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
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

export default AiImage;
