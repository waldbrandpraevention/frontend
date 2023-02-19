import "../assets/styles/App.css";
import AlertEmergencyUnits from "../components/tiles/AlertEmergencyUnits";
import Area from "../components/tiles/Area";
import Map from "../components/tiles/Map";
import AlertDrone from "../components/tiles/AlertDrone";
import DroneInfo from "../components/tiles/DroneInfo";
import FireDetection from "../components/tiles/FireDetection";
import PotentialFiresite from "../components/tiles/PotentialFiresite";
import { tiles } from "../utils/tile";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import DroneImage from "../components/tiles/advanced/DroneImage";
import AiAnalysis from "../components/tiles/advanced/AiAnalysis";
import AiImage from "../components/tiles/advanced/AiImage";
import AiFeedback from "../components/tiles/advanced/AiFeedback";
import { useMapStore } from "../stores/MapStore";

const TilesLayout = lazy(() => import("../components/TilesLayout"));

const Advanced = () => {
  useMapStore(state => state.setActiveZone)(-1) /* show all zones */

  const { defaultTiles, defaultLayout } = tiles([
    { el: <DroneInfo />, id: "a", name: "Drohneninfo", main: { x: 0, y: 0, w: 8, h: 5 }, mobile: { x: 0, y: 0, w: 24, h: 3 } },
    { el: <Area />, id: "b", name: "Überwachungsgebiet", main: { x: 8, y: 0, w: 8, h: 5 }, mobile: { x: 0, y: 3, w: 24, h: 3 } },
    { el: <FireDetection />, id: "c", name: "Feuerdetektion", main: { x: 16, y: 0, w: 8, h: 5 }, mobile: { x: 0, y: 6, w: 24, h: 3 } },
    { el: <Map />, id: "g", name: "Karte", main: { x: 0, y: 5, w: 16, h: 10 }, mobile: { x: 0, y: 9, w: 24, h: 10 } },
    { el: <PotentialFiresite />, id: "d", name: "Vermutete Brandstelle", main: { x: 18, y: 5, w: 8, h: 10 }, mobile: { x: 0, y: 19, w: 24, h: 10 } },
    { el: <DroneImage />, id: "di", name: "Drohnenbild", main: { x: 0, y: 15, w: 8, h: 10 }, mobile: { x: 0, y: 29, w: 24, h: 12 } },
    { el: <AiImage />, id: "aii", name: "KI Einschätzung", main: { x: 8, y: 15, w: 8, h: 10 }, mobile: { x: 0, y: 29, w: 24, h: 12 } },
    { el: <AiAnalysis />, id: "aia", name: "KI Analyse", main: { x: 16, y: 15, w: 8, h: 10 }, mobile: { x: 0, y: 29, w: 24, h: 12 } },
    { el: <AlertDrone />, id: "e", name: "Drohne alarmieren", main: { x: 0, y: 23, w: 8, h: 12 }, mobile: { x: 0, y: 29, w: 24, h: 12 } },
    { el: <AlertEmergencyUnits />, id: "f", name: "Einsatzkräfte alarmieren", main: { x: 8, y: 23, w: 8, h: 12 }, mobile: { x: 0, y: 33, w: 24, h: 17 } },
    { el: <AiFeedback />, id: "aif", name: "KI Feedback", main: { x: 16, y: 23, w: 8, h: 12 }, mobile: { x: 0, y: 33, w: 24, h: 17 } },
  ])

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <TilesLayout layoutId="advanced" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
      </Suspense>
    </div>
  );
};

export default Advanced;
