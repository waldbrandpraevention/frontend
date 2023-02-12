import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export enum EventType {
  SMOKE = 1,
  FIRE = 2,
}

export type Event = {
  /**
   * Drone ID
   */
  drone_id: number;
  /**
   * Type of the event
   */
  type: EventType;
  /**
   * Event ID
   */
  id: number;
  /**
   * Zone ID
   */
  zone_id: number;
  /**
   * Timestamp of the event
   */
  timestamp: Date;
  /**
   * Longitude of the event
   */
  lon: number;
  /**
   * Latitude of the event
   */
  lat: number;
  /**
   * Confidence of the AI
   */
  confidence: number;
  /**
   * URL for actual drone image
   */
  picture_path: string;
  /**
   * URL for AI image
   */
  ai_path: string;
};

export const dummyData = (): Event[] => {
  let dummy: Event[] = [];

  dummy.push({
    drone_id: 1,
    type: EventType.SMOKE,
    id: 1,
    zone_id: 1,
    timestamp: new Date(),
    lon: 12.548618316650392,
    lat: 52.19424496781449,
    confidence: 0.5,
    picture_path:
      "https://cdn.discordapp.com/attachments/499641936840491026/1074326791533109248/FB_IMG_1676125977347.png",
    ai_path:
      "https://cdn.discordapp.com/attachments/499641936840491026/1074326791533109248/FB_IMG_1676125977347.png",
  });

  dummy.push({
    drone_id: 2,
    type: EventType.FIRE,
    id: 2,
    zone_id: 2,
    timestamp: new Date(),
    lon: 12.445106506347658,
    lat: 52.20139976622065,
    confidence: 0.5,
    picture_path: "https://bp.adriansoftware.de/media/bg/LoadingImage19.png",
    ai_path: "https://bp.adriansoftware.de/media/bg/LoadingImage19.png",
  });

  return dummy;
};

export const useEvents = () => {
  return useQuery<Event[]>(
    ["events"],
    () => {
      return axios.get("/events/all/").then((e) => e.data);
    },
    { refetchInterval: 30000 /* 30s */ }
  );
};
