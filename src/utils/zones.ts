import { useQuery } from "@tanstack/react-query"
import axios from "axios";

type Zone = {

}

export const useZones = () => {
  return useQuery(["zones"], () => {
    return axios.get("/zones/all/").then(e => e.data);
  }, { refetchOnWindowFocus: false });
}

export const useZone = (id: string) => {
  return useQuery(["zones", id], () => {
    return axios.get(`/zones/?zone_id=${encodeURIComponent(id)}`).then(e => e.data);
  }, { refetchOnWindowFocus: false });
}