import { Circle, GeoJSON } from "react-leaflet"
import { useMapStore } from "../../stores/MapStore"
import { useDrones } from "../../utils/drones"
import Drone from "./Drone"

const DronesContainer = () => {
  const activeZone = useMapStore(state => state.activeZone)
  const showDroneRoutes = useMapStore(state => state.showDroneRoutes)

  const { data: droneData } = useDrones();

  return <>{(droneData || []).map(d => (activeZone === -1 || d.zone_id === activeZone) &&
    <>
      <Drone data={d} />
      {showDroneRoutes && <GeoJSON data={d.route as any} />}
    </>
  )}</>
}

export default DronesContainer