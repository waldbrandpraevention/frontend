import { useQuery } from "@tanstack/react-query"
import axios from "axios"

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
   * Longitude of the drone
   */
  lon: number,
  /**
   * Latitude of the drone
   */
  lat: number,
  /**
   * Remaining battery of the drone in minutes
   */
  flight_time: number,
  /**
   * Remaining flight range of the drone in meters
   */
  flight_range: number,
  /**
   * Drone route if available
   */
  route?: GeoJSON.Feature<GeoJSON.LineString>,
  /**
   * Timestamp of the last position update
   */
  timestamp: Date
}

export const dummyData: Drone[] = [
  {
    drone_id: 1,
    zone_id: 120695910448,
    lat: 52.11114403064547,
    lon: 12.705516815185547,
    flight_time: 13,
    flight_range: 1200,
    timestamp: new Date(d.getTime() - 10 * 60 * 1000),
  },
  {
    drone_id: 4,
    zone_id: 120695910448,
    lat: 52.03887098270015,
    lon: 12.70448684782383,
    flight_time: 13,
    flight_range: 1200,
    timestamp: new Date(d.getTime() - 5 * 60 * 1000),
  },
  {
    drone_id: 69,
    zone_id: 120695910448,
    lat: 52.26059305351773,
    lon: 12.501068115234377,
    flight_time: 13,
    flight_range: 1200,
    timestamp: new Date(d.getTime() - 12 * 60 * 1000),
  },
  {
    drone_id: 420,
    zone_id: 120695910448,
    lat: 52.31813347421495,
    lon: 12.838211059570312,
    flight_time: 13,
    flight_range: 1200,
    timestamp: new Date(d.getTime() - 3 * 60 * 1000),
  },
]

export const useDrones = () => {
  return useQuery<Drone[]>(["drones"], () => {
    return axios.get("/drones/route/").then(e => e.data);
  }, { refetchInterval: 10000 /* 10s */ });
}
