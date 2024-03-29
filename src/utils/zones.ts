import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useArea } from "./area";
import { Event } from "./events";

export type Zone = {
  /**
   * AI Firerisk
   */
  ai_fire_risk: number;
  /**
   * DWD Firerisk
   */
  dwd_fire_risk: number;
  /**
   * AI Fire detection
   */
  ai_fire_detection: number;
  /**
   * AI Smoke detection
   */
  ai_smoke_detection: number;
  /**
   * 'Landkreis / Kreisfreie Stadt'
   */
  district: string;
  /**
   * 'Ort'
   */
  name: string;
  /**
   * Drone Events
   */
  events: Event[];
  /**
   * 'Bundesland'
   */
  federal_state: string;
  /**
   * Number of drones in zone
   */
  drone_count: number;
  /**
   * Timestamp of last update
   */
  last_update: Date;
  /**
   * GeoJSON outline for zone
   */
  geo_json: GeoJSON.Feature<GeoJSON.GeometryObject>;
  /**
   * Latitude of center of zone
   */
  lat: number;
  /**
   * Longitude of center of zone
   */
  lon: number;
  /**
   * Zone ID
   */
  id: number;
};

export const useZones = () => {
  return useQuery<Zone[]>(
    ["zones"],
    () => {
      return axios.get("/zones/all/").then((e) => e.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 300000 /* 5min */,
    }
  );
};

export const useZone = (id: number | string) => {
  return useQuery<Zone>(
    ["zones", id],
    () => {
      return axios
        .get(`/zones/?zone_id=${encodeURIComponent(id)}`)
        .then((e) => e.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 30000 /* 30s */ /* cacheTime: 300000 */ /* 5min */,
    }
  );
};

/**
 * Get the firerisk for all zones
 */
export const useFirerisk = () => {
  return useArea();
};

/**
 * for leaflet
 */
export const getPolygonStyle = (z: Zone): L.PathOptions => {
  if (z.dwd_fire_risk > 1 || z.ai_fire_risk > 1) {
    return {
      fillColor: "#F44336",
      color: "#F44336",
      weight: 1,
    };
  }
  /* default blue */
  return {
    fillColor: "#2196F3",
    color: "#2196F3",
    weight: 1,
    fillOpacity: 0.1,
  };
};
