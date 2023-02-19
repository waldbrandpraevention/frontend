import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { refetchInterval } from "../config/config";

export type Area = {
  /**
   * Area ID
   */
  id: number;
  /**
   * Name of the area
   */
  name: string;
  /**
   * Organization ID
   */
  orga_id: number;
  /**
   * Description of the area
   */
  description: string;
  /**
   * AI firerisk
   */
  ai_fire_risk: number;
  /**
   * DWD firerisk
   */
  dwd_fire_risk: number;
  /**
   * Longitude of the event
   */
  lon: number;
  /**
   * Latitude of the event
   */
  lat: number;
  /**
   * Timestamp of the last update
   */
  last_update: Date;
  /**
   * GeoJSON of the area
   */
  geo_json: GeoJSON.GeoJSON;
  /**
   * Number of drones in the area
   */
  drone_count: number;
  /**
   * Number of zones in the area
   */
  zone_count: number;
};

export const useArea = () => {
  return useQuery<Area[]>(
    ["area"],
    () => {
      return axios.get("/territories/all/").then((e) => e.data);
    },
    { refetchInterval }
  );
};
