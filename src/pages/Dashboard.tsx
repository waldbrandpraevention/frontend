import "../assets/styles/App.css";
import AlertEmergencyUnits from '../components/tiles/AlertEmergencyUnits';
import Area from '../components/tiles/Area';
import DroneCount from '../components/tiles/DroneCount';
import Firerisk from '../components/tiles/Firerisk';
import WeatherForecast from '../components/tiles/WeatherForecast';
import ZoneOverview from '../components/tiles/ZoneOverview';
import { lazy, Suspense } from "react";
import { tiles } from "../utils/tile";
import Loading from "../components/Loading";
import Map from "../components/tiles/Map";
import WeatherTable from "../components/tiles/WeatherTable";
import AlertsList from "../components/tiles/AlertsList";
import { useMapStore } from "../stores/MapStore";
const TilesLayout = lazy(() => import("../components/TilesLayout"))

const Dashboard = () => {
  useMapStore(state => state.setActiveZone)(-1) /* show all zones */

  const { defaultTiles, defaultLayout } = tiles([
    { el: <DroneCount />, id: "a", name: "Drohnenanzahl", main: { x: 0, y: 0, w: 8, h: 3 }, mobile: { x: 0, y: 0, w: 24, h: 3 } },
    { el: <Area />, id: "b", name: "Überwachungsgebiet", main: { x: 8, y: 0, w: 8, h: 3 }, mobile: { x: 0, y: 3, w: 24, h: 3 } },
    { el: <Firerisk />, id: "c", name: "Feuerrisiko", main: { x: 16, y: 0, w: 8, h: 3 }, mobile: { x: 0, y: 6, w: 24, h: 3 } },
    { el: <Map />, id: "g", name: "Karte", noEditmode: true, main: { x: 0, y: 4, w: 18, h: 11 }, mobile: { x: 0, y: 9, w: 24, h: 10 } },
    { el: <WeatherForecast />, id: "d", name: "Wettervorhersage", main: { x: 18, y: 4, w: 6, h: 11 }, mobile: { x: 0, y: 19, w: 24, h: 11 } },
    { el: <WeatherTable />, id: "dd", name: "Wetter Tabelle", noEditmode: true, enabled: false, main: { x: 0, y: 5, w: 24, h: 10 }, mobile: { x: 0, y: 29, w: 24, h: 10 } },
    { el: <ZoneOverview />, id: "e", name: "Zonenübersicht", main: { x: 0, y: 16, w: 16, h: 12 }, mobile: { x: 0, y: 29, w: 24, h: 12 } },
    { el: <AlertEmergencyUnits />, id: "f", name: "Einsatzkräfte alarmieren", main: { x: 16, y: 16, w: 8, h: 12 }, mobile: { x: 0, y: 33, w: 24, h: 17 }, },
    { el: <AlertsList />, id: "alerts", name: "Alarme", noEditmode: true, enabled: false, main: { x: 12, y: 22, w: 12, h: 9 }, mobile: { x: 0, y: 54, w: 24, h: 9 } },
  ])

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <TilesLayout layoutId="dashboard-v1" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
      </Suspense>
    </div >
  );
}

export default Dashboard;
