
import Tile from "../../Tile";
import Card from 'react-bootstrap/esm/Card';
import Carousel from "react-bootstrap/Carousel";
import Annotorious from "./Annotorious";
import { useAdvancedStore } from "../../../stores/AdvancedStore";
import { useEvents } from "../../../utils/events";
import ErrorAlert from "../../alerts/ErrorAlert";
import LoadingTile from "../LoadingTile";

const AiImage = () => {
  const id = useAdvancedStore(store => store.id)
  const setId = useAdvancedStore(store => store.setId)
  const { data: events, isLoading, isError } = useEvents();
  const handleSelect = (selectedIndex: number, e: any) => {
    setId(selectedIndex);
  };

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        KI Bild konnte nicht geladen werden.
      </ErrorAlert>
    );

  return (
    <Tile>
      <Card.Title className="text-center">KI Einschätzung</Card.Title>
      <Carousel activeIndex={id} onSelect={handleSelect} >
        {
          events.map(item => (
            <Carousel.Item >
              <Annotorious image={item.id} />
              <Card.Text >Position: {item.lat}, {item.lon};  Zone: {item.drone_id}; Zeitpunkt: {item.timestamp.toLocaleString()}</Card.Text>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </Tile >
  );
};

export default AiImage;