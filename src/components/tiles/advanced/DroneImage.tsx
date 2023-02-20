import Tile from "../../Tile";
import Card from 'react-bootstrap/esm/Card';
import { useAdvancedStore } from "../../../stores/AdvancedStore";
import { useEvents } from "../../../utils/events";
import ErrorAlert from "../../alerts/ErrorAlert";
import LoadingTile from "../LoadingTile";
import { Carousel } from "react-bootstrap";

const DroneImage = () => {
  const id = useAdvancedStore(store => store.id)
  const setId = useAdvancedStore(store => store.setId)
  const { data: events, isLoading, isError } = useEvents();
  // const events = dummyData();
  const handleSelect = (selectedIndex: number, e: any) => {
    setId(selectedIndex);
  };

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        Drohnenbild konnte nicht geladen werden.
      </ErrorAlert>
    );

  return (
    <Tile>
      <Card.Title className="text-center">Drohnenbild</Card.Title>
      <Carousel activeIndex={id} onSelect={handleSelect} >
        {
          events.map(item => (
            <Carousel.Item >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  style={{ width: '100%', maxHeight: '80%' }}
                  src={item.picture_path}
                  alt="KI Einschaezung" />
              </div>
              <Card.Text >Position: {item.lat}, {item.lon};  Zone: {item.drone_id}; Zeitpunkt: {item.timestamp.toLocaleString()}</Card.Text>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </Tile >
  );
};

export default DroneImage