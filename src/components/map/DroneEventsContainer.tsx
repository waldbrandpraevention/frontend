import { useMapStore } from "../../stores/MapStore"
import { useEvents } from "../../utils/events"
import DroneEvent from "./DroneEvent"

const DroneEventsContainer = () => {
  const activeZone = useMapStore(state => state.activeZone)

  const { data: eventData } = useEvents();

  return <>{(eventData || []).map(e => (activeZone === -1 || e.zone_id === activeZone)  && <DroneEvent data={e} />)}</>
}

export default DroneEventsContainer