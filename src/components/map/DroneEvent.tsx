import L, { LeafletEvent } from "leaflet";
import { Marker } from "react-leaflet";
import { useMapStore } from "../../stores/MapStore";
import { Event, EventType } from "../../utils/events";

type DroneEventProps = {
  data: Event
}

const fireIcon = L.icon({
  // https://www.flaticon.com/free-icon/fire_599694
  iconUrl: "https://cdn-icons-png.flaticon.com/512/599/599694.png",
  iconSize: [40, 40],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
});

const smokeIcon = L.icon({
  // https://www.flaticon.com/free-icon/dust_4383809?term=cloud&page=1&position=60&origin=style&related_id=4383809
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4383/4383809.png",
  iconSize: [40, 40],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
});

const DroneEvent = ({ data }: DroneEventProps) => {
  const setActiveEvent = useMapStore(state => state.setActiveEvent);

  const onHover = (e: LeafletEvent) => {
    setActiveEvent(data.id);
  }

  return (
    <Marker eventHandlers={{ mouseover: onHover, click: onHover }} icon={data.event_type === EventType.SMOKE ? smokeIcon : fireIcon} position={[data.lat, data.lon]}></Marker>
  )
}

export default DroneEvent