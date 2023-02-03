import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export enum EventType {
  SMOKE = 1,
  FIRE = 2,
}

export type Event = {
  /**
   * Drone ID
   */
  drone_id: number,
  /**
   * Type of the event
   */
  type: EventType,
  /**
   * Timestamp of the event
   */
  timestamp: Date,
  /**
   * Longitude of the event
   */
  lon: number,
  /**
   * Latitude of the event
   */
  lat: number,
  /**
   * Confidence of the AI
   */
  confidence: number,
  /**
   * URL for actual drone image
   */
  picture_path: string,
  /**
   * URL for AI image
   */
  ai_path: string,
}

export const dummyData = (): Event[] => {
  let dummy: Event[] = []

  dummy.push({
    drone_id: 1,
    type: EventType.SMOKE,
    timestamp: new Date(),
    lon: 12.548618316650392,
    lat: 52.19424496781449,
    confidence: 0.5,
    picture_path: "https://picsum.photos/200",
    ai_path: "https://picsum.photos/200",
  })

  dummy.push({
    drone_id: 2,
    type: EventType.FIRE,
    timestamp: new Date(),
    lon: 12.445106506347658,
    lat: 52.20139976622065,
    confidence: 0.5,
    picture_path: "https://picsum.photos/200",
    ai_path: "https://picsum.photos/200",
  })

  return dummy
}

export const useDrones = () => {
  return useQuery<Event[]>(["events"], () => {
    return axios.get("/events/all/").then(e => e.data);
  }, { refetchInterval: 30000 /* 30s */ });
}
