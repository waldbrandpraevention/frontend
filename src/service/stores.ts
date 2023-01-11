/* To share data between tiles in dashboard: <Map> <-> [lat,lon] <-> <WeatherForecast> */
import { LatLngTuple } from "leaflet"
import { create } from 'zustand'

type MapStore = {
  center: LatLngTuple,
  setCenter: (newCenter: LatLngTuple) => void
}

export const useMapStore = create<MapStore>()((set) => ({
  center: [50.06, 8.64], /* = Frankfurt coordiantes */
  setCenter: (newCenter: LatLngTuple) => set(() => ({ center: newCenter })),
}))