import { useState } from "react"
// import { useMapStore } from "../../stores/MapStore"
import { Event, dummyData } from "../../utils/events"
import DroneEvent from "./DroneEvent"

const DroneEventsContainer = () => {
  // const activeZone = useMapStore(state => state.activeZone)

  // TODO: useEvents() hook for data
  const [eventData, /* setEventData */] = useState<Event[]>(dummyData())

  return <>{eventData.map(e => /* (activeZone === -1 || e.zone_id === activeZone)  && */ <DroneEvent data={e} />)}</>
}

export default DroneEventsContainer