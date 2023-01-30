import { useEffect, useState } from "react"
import { useMapStore } from "../../stores/MapStore"
import { dummyData } from "../../utils/drones"
import { randomIntBetween } from "../../utils/util"
import { Drone as DroneType } from "../../utils/drones"
import Drone from "./Drone"

const DronesContainer = () => {
  const activeZone = useMapStore(state => state.activeZone)

  // TODO: useDrones() hook for data
  const [droneData, setDroneData] = useState<DroneType[]>(dummyData)

  // demo: update drone positions 
  useEffect(() => {
    const t = setInterval(() => {
      setDroneData(oldData => {
        let newDroneData: DroneType[] = [];
        oldData.forEach(d => newDroneData.push(
          { ...d, position: [d.position[0] + randomIntBetween(-50, 50) * 0.001, d.position[1] + randomIntBetween(-50, 50) * 0.001] }
        ))
        return newDroneData;
      })
      return () => clearInterval(t)
    }, 10000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{droneData.map(d => (activeZone === -1 || d.zone_id === activeZone) && <Drone data={d} />)}</>

  // find all unique drone ids in active zone or all zones. newq Set() removes duplicates but not need if always latest data
  // const droneIds = [...new Set(droneData.filter(d => activeZone === -1 || d.zone_id === activeZone).map(d => d.drone_id))]
  // return <>{droneIds.map(id => <Drone data={droneData.find(_d => _d.drone_id === id) as DroneType}></Drone>)}</>
}

export default DronesContainer