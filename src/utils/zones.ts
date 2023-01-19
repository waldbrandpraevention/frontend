import { useQuery } from "@tanstack/react-query"
import axios from "axios";

type Zone = {

}

export const useZones = (enabled: boolean = true) => {
  return useQuery(["zones"], () => {
    return axios.get("/zones/all/").then(e => e.data);
  }, { enabled, refetchOnWindowFocus: false });
}