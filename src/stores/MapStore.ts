import { LatLngTuple } from "leaflet";
import { create } from 'zustand';

type MapStore = {
  center: LatLngTuple;
  setCenter: (newCenter: LatLngTuple) => void;
  zoom: number;
  setZoom: (newZoom: number) => void;
  activeZone: number;
  setActiveZone: (newZone: number) => void;
  showDroneRoutes: boolean;
  setShowDroneRoutes: (newShow: boolean) => void;
  /**
   * The currently active event when clicking/hovering over an event on the map
   */
  activeEvent: number;
  setActiveEvent: (newEvent: number) => void;
  /**
   * Active area/territory
   */
  activeArea: number;
  setActiveArea: (newArea: number) => void;
};

export const useMapStore = create<MapStore>()((set) => ({
  center: [50.83942983017336, 10.241776091505844],
  setCenter: (newCenter: LatLngTuple) => set(() => ({ center: newCenter })),
  zoom: 7,
  setZoom: (newZoom: number) => set(() => ({ zoom: newZoom })),
  activeZone: -1,
  setActiveZone: (newZone: number) => set(() => ({ activeZone: newZone })),
  showDroneRoutes: true,
  setShowDroneRoutes: (newShow: boolean) => set(() => ({ showDroneRoutes: newShow })),
  activeEvent: -1,
  setActiveEvent: (newEvent: number) => set(() => ({ activeEvent: newEvent })),
  activeArea: -1,
  setActiveArea: (newArea: number) => set(() => ({ activeArea: newArea })),
}));
