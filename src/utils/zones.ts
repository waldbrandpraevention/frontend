import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { LatLngTuple } from "leaflet";

type Zone = {
  /**
   * AI Firerisk
   */
  ai: number;
  /**
   * DWD Firerisk
   */
  fire_risk: number;
  /**
   * Landkreis / Kreisfreie Stadt
   */
  district: string;
  /**
   * Ort
   */
  name: string;
  /**
   * Drone Events
   */
  events: any[];
  federal_state: string;
  geo_json: GeoJSON.Feature<GeoJSON.GeometryObject>;
  geo_point: LatLngTuple;
  id: number;
}

export const useZones = () => {
  return useQuery<Zone[]>(["zones"], () => {
    return axios.get("/zones/all/").then(e => e.data);
  }, { refetchOnWindowFocus: false });
}

export const useZone = (id: string) => {
  return useQuery<Zone>(["zones", id], () => {
    return axios.get(`/zones/?zone_id=${encodeURIComponent(id)}`).then(e => e.data);
  }, { refetchOnWindowFocus: false });
}