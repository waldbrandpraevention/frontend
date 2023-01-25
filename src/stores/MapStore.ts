import { LatLngTuple } from "leaflet";
import { create } from 'zustand';

type MapStore = {
  center: LatLngTuple;
  setCenter: (newCenter: LatLngTuple) => void;
  activeZone: number;
  setActiveZone: (newZone: number) => void;
};

export const useMapStore = create<MapStore>()((set) => ({
  center: [50.06, 8.64],
  setCenter: (newCenter: LatLngTuple) => set(() => ({ center: newCenter })),
  activeZone: -1,
  setActiveZone: (newZone: number) => set(() => ({ activeZone: newZone })),
}));
