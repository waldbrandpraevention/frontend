import L, { LatLngTuple } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { Drone as DroneType } from "../../utils/drones";

type DroneProps = {
  data: DroneType
}

const droneIcon = L.icon({
  // https://www.flaticon.com/free-icon/drone_8607675
  iconUrl: "https://cdn-icons-png.flaticon.com/512/8607/8607675.png",
  iconSize: [40, 40],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
});

const Drone = ({ data }: DroneProps) => {
  const position: LatLngTuple = useMemo(() => [data.lat, data.lon], [data.lat, data.lon])
  const [prevPos, setPrevPos] = useState<LatLngTuple>([data.lat, data.lon])

  useEffect(() => {
    if (prevPos[1] !== position[1] && prevPos[0] !== position[0]) setPrevPos(position)
  }, [position, prevPos])

  return (
    <LeafletTrackingMarker rotationAngle={0} icon={droneIcon} position={position} previousPosition={prevPos} duration={10000} />
  )
}

export default Drone