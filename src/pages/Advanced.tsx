import "../assets/styles/App.css";
import AlertEmergencyUnits from "../components/tiles/AlertEmergencyUnits";
import Area from "../components/tiles/Area";
import Map from "../components/tiles/Map";
import AlertDrone from "../components/tiles/AlertDrone";
import DroneInfo from "../components/tiles/DroneInfo";
import FireDetection from "../components/tiles/FireDetection";
import PotentialFiresite from "../components/tiles/PotentialFiresite";
import { makeTile, sortTiles, TileElement, TileLayouts } from "../utils/tile";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const TilesLayout = lazy(() => import("../components/TilesLayout"));

const Advanced = () => {
  const defaultTiles: TileElement[] = sortTiles([
    makeTile(<DroneInfo />, "a", "Drohneninfo"),  /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
    makeTile(<Area />, "b", "Überwachungsgebiet"),
    makeTile(<FireDetection />, "c", "Feuerdetektion"),
    makeTile(<Map />, "g", "Karte", true, true),
    makeTile(<PotentialFiresite />, "d", "Vermutete Brandstelle"),
    makeTile(<AlertDrone />, "e", "Drohne alarmieren"),
    makeTile(<AlertEmergencyUnits />, "f", "Einsatzkräfte alarmieren"),
  ])

  const defaultLayout: TileLayouts = {
    main: [
      { i: "a", x: 0, y: 0, w: 8, h: 5 },
      { i: "b", x: 8, y: 0, w: 8, h: 5 },
      { i: "c", x: 16, y: 0, w: 8, h: 5 },
      { i: "g", x: 0, y: 5, w: 16, h: 10 },
      { i: "d", x: 18, y: 5, w: 8, h: 10 },
      { i: "e", x: 0, y: 15, w: 12, h: 12 },
      { i: "f", x: 12, y: 15, w: 12, h: 12 },
    ],
    mobile: [
      { i: "a", x: 0, y: 0, w: 8, h: 5 },
      { i: "b", x: 8, y: 0, w: 8, h: 5 },
      { i: "c", x: 16, y: 0, w: 8, h: 5 },
      { i: "g", x: 0, y: 5, w: 16, h: 10 },
      { i: "d", x: 18, y: 5, w: 8, h: 10 },
      { i: "e", x: 0, y: 15, w: 12, h: 12 },
      { i: "f", x: 12, y: 15, w: 12, h: 12 },
    ],
  }

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <TilesLayout layoutId="advanced" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
      </Suspense>
    </div>
  );
};

export default Advanced;
