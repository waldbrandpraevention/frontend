import { useMapStore } from "../../stores/MapStore"
import { useDrones } from "../../utils/drones"
import Drone from "./Drone"

const DronesContainer = () => {
  const activeZone = useMapStore(state => state.activeZone)

  const { data: droneData } = useDrones();

  return <>{(droneData || []).map(d => (activeZone === -1 || d.zone_id === activeZone) && <Drone data={d} />)}</>
}

export default DronesContainer