import L, { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { Drone as DroneType } from "../../utils/drones";

type DroneProps = {
  data: DroneType
}

const droneIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4212/4212583.png",
  iconSize: [30, 30],
  iconAnchor: [18, 18],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
});

const Drone = ({ data }: DroneProps) => {
  const position = data.position
  const [prevPos, setPrevPos] = useState<LatLngTuple>(data.position)

  useEffect(() => {
    if (prevPos[1] !== position[1] && prevPos[0] !== position[0]) setPrevPos(position)
  }, [position, prevPos])

  return (
    <LeafletTrackingMarker rotationAngle={0} icon={droneIcon} position={position} previousPosition={prevPos} duration={10000} />
  )
}

export default Drone