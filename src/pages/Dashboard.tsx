import "../assets/styles/App.css";
import AlertEmergencyUnits from '../components/tiles/AlertEmergencyUnits';
import Area from '../components/tiles/Area';
import DroneCount from '../components/tiles/DroneCount';
import Firerisk from '../components/tiles/Firerisk';
import WeatherForecast from '../components/tiles/WeatherForecast';
import ZoneOverview from '../components/tiles/ZoneOverview';
import { lazy, Suspense, useEffect } from "react";
import { makeTile, sortTiles, TileElement, TileLayouts } from "../utils/tile";
import { toast } from 'react-toastify';
import { useAuth } from "../service/auth";
import Loading from "../components/Loading";
import Map from "../components/tiles/Map";
import WeatherTable from "../components/tiles/WeatherTable";
const TilesLayout = lazy(() => import("../components/TilesLayout"))

const Dashboard = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user.mail_verified) toast.warn("Sie haben Ihre E-Mail Adresse noch nicht verifiziert", { toastId: "mail_unverified" })
  }, [user.mail_verified])

  const defaultTiles: TileElement[] = sortTiles([
    makeTile(<DroneCount />, "a", "Drohnenanzahl"),  /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
    makeTile(<Area />, "b", "Überwachungsgebiet"),
    makeTile(<Firerisk />, "c", "Feuerrisiko"),
    makeTile(<Map />, "g", "Karte", true, true),
    makeTile(<WeatherForecast />, "d", "Wettervorhersage", true, true),
    makeTile(<WeatherTable />, "dd", "Wetter Tabelle", false, true),
    makeTile(<ZoneOverview />, "e", "Zonenübersicht"),
    makeTile(<AlertEmergencyUnits />, "f", "Einsatzkräfte alarmieren"),
  ])

  const defaultLayout: TileLayouts = {
    main: [ /* tablet + desktop */
      { i: "a", x: 0, y: 0, w: 8, h: 3 }, /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
      { i: "b", x: 8, y: 0, w: 8, h: 3 },
      { i: "c", x: 16, y: 0, w: 8, h: 3 },
      { i: "g", x: 0, y: 4, w: 18, h: 10 },
      { i: "d", x: 18, y: 4, w: 6, h: 10 },
      { i: "dd", x: 0, y: 4, w: 24, h: 10 },
      { i: "e", x: 0, y: 15, w: 16, h: 12 },
      { i: "f", x: 16, y: 15, w: 8, h: 12 },
    ],
    mobile: [ /* mobile */
      { i: "a", x: 0, y: 0, w: 24, h: 3 }, /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
      { i: "b", x: 0, y: 3, w: 24, h: 3 },
      { i: "c", x: 0, y: 6, w: 24, h: 3 },
      { i: "g", x: 0, y: 9, w: 24, h: 10 },
      { i: "d", x: 0, y: 19, w: 24, h: 10 },
      { i: "dd", x: 0, y: 29, w: 24, h: 10 },
      { i: "e", x: 0, y: 29, w: 24, h: 12 },
      { i: "f", x: 0, y: 33, w: 24, h: 17 },
    ]
  }

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <TilesLayout layoutId="dashboard" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
      </Suspense>
    </div >
  );
}

export default Dashboard;
