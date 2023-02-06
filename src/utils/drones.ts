import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LatLngTuple } from "leaflet"

const d = new Date()

export type Drone = {
  /**
   * Drone id
   */
  drone_id: number,
  /**
   * Zone id of the drone
   */
  zone_id: number,
  /**
   * Position of the drone
   */
  position: LatLngTuple,
  /**
   * Timestamp of the last position update
   */
  timestamp: Date
}

export const dummyData: Drone[] = [
  {
    drone_id: 1,
    zone_id: 120695910448,
    position: [52.11114403064547, 12.705516815185547],
    timestamp: new Date(d.getTime() - 10 * 60 * 1000),
  },
  {
    drone_id: 4,
    zone_id: 120695910448,
    position: [52.03887098270015, 12.70448684782383],
    timestamp: new Date(d.getTime() - 5 * 60 * 1000),
  },
  {
    drone_id: 69,
    zone_id: 120695910448,
    position: [52.26059305351773, 12.501068115234377],
    timestamp: new Date(d.getTime() - 12 * 60 * 1000),
  },
  {
    drone_id: 420,
    zone_id: 120695910448,
    position: [52.31813347421495,  12.838211059570312],
    timestamp: new Date(d.getTime() - 3 * 60 * 1000),
  },
]

export const useDrones = () => {
  return useQuery<Drone[]>(["drones"], () => {
    return axios.get("/drones/all/").then(e => e.data);
  }, { refetchInterval: 30000 /* 30s */ });
}
