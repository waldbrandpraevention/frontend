import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Incident = {
  /**
   * Incident id
   */
  id: number;
  /**
   * Drone id / name
   */
  drone_name: string;
  /**
   * Location of the incident
   */
  location: string;
  /**
   * type of incident
   */
  alarm_type: string;
  /**
   * Notes about the incident
   */
  notes: string;
  /**
   * Timestamp of the last position update
   */
  timestamp: Date;
};

export const useIncidents = () => {
  return useQuery<Incident[]>(
    ["incidents"],
    () => {
      return axios.get("/incidents/get-all/").then((e) => e.data);
    },
    { refetchInterval: 10000 /* 10s */ }
  );
};
