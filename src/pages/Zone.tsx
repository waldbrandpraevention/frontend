import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "../components/alerts/ErrorAlert";
import AlertEmergencyUnits from "../components/tiles/AlertEmergencyUnits";
import Firerisk from "../components/tiles/Firerisk";
import LoadingTile from "../components/tiles/LoadingTile";
import WeatherForecast from "../components/tiles/WeatherForecast";
import WeatherTable from "../components/tiles/WeatherTable";
import Map from "../components/tiles/Map";
import { tiles } from "../utils/tile";
import { Suspense } from "react";
import Loading from "../components/Loading";
import TilesLayout from "../components/TilesLayout";
import { TbChevronLeft } from "react-icons/tb";
import PotentialFiresite from "../components/tiles/PotentialFiresite";
import AlertDrone from "../components/tiles/AlertDrone";
import FireDetection from "../components/tiles/FireDetection";
import { useZone } from "../utils/zones";
import { useMapStore } from "../stores/MapStore";
import { useColorStore } from "../stores/ColorStore";
import DroneCount from "../components/tiles/DroneCount";

const Zone = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const setActiveZone = useMapStore(state => state.setActiveZone)
  const setCenter = useMapStore(state => state.setCenter)
  const setZoom = useMapStore(state => state.setZoom)
  const subdashBgColor = useColorStore(state => state.sidebarBackground)
  const subdashColor = useColorStore(state => state.sidebarText)

  const { data: zone, isLoading, isError } = useZone(id as string)

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Zone nicht gefunden.</ErrorAlert>;

  setActiveZone(zone.id) /* show only this zone on map */
  setCenter([zone.lat, zone.lon]) /* center map on zone */
  setZoom(11); /* zoom in to zone */

  const { defaultTiles, defaultLayout } = tiles([
    { el: <DroneCount />, id: "a", name: "Drohnenanzahl", main: { x: 0, y: 0, w: 8, h: 3 }, mobile: { x: 0, y: 0, w: 24, h: 3 } },
    { el: <FireDetection />, id: "b", name: "Überwachungsgebiet", main: { x: 8, y: 0, w: 8, h: 3 }, mobile: { x: 0, y: 3, w: 24, h: 3 } },
    { el: <Firerisk />, id: "c", name: "Feuerrisiko", main: { x: 16, y: 0, w: 8, h: 3 }, mobile: { x: 0, y: 6, w: 24, h: 3 } },

    { el: <Map />, id: "g", name: "Karte", noEditmode: true, main: { x: 0, y: 5, w: 18, h: 11 }, mobile: { x: 0, y: 9, w: 24, h: 10 } },
    { el: <WeatherForecast />, id: "d", name: "Wettervorhersage", main: { x: 18, y: 5, w: 6, h: 11 }, mobile: { x: 0, y: 19, w: 24, h: 10 } },

    { el: <PotentialFiresite />, id: "e", name: "Potentielle Feuerstelle", main: { x: 0, y: 17, w: 8, h: 12 }, mobile: { x: 0, y: 29, w: 24, h: 12 } },
    { el: <WeatherTable />, id: "dd", name: "Wetter Tabelle", noEditmode: true, enabled: false, main: { x: 0, y: 4, w: 24, h: 10 }, mobile: { x: 0, y: 29, w: 24, h: 10 } },
    { el: <AlertEmergencyUnits />, id: "f", name: "Einsatzkräfte alarmieren", main: { x: 16, y: 17, w: 8, h: 12 }, mobile: { x: 0, y: 33, w: 24, h: 17 }, },
    { el: <AlertDrone />, id: "alerts", name: "Alarme", main: { x: 8, y: 17, w: 8, h: 12 }, mobile: { x: 0, y: 54, w: 24, h: 9 } },
  ])

  return (
    <div className="App_">
      <div>
        <Card className="p-1 rounded-0 border-0" style={{ background: subdashBgColor }}>
          <Card.Body className="p-0">
            <Row className="align-items-center">
              <Col className="col-auto">
                <Button size="sm" onClick={() => navigate("/zones")} variant="outline-light" className="d-flex align-items-center" style={{ borderColor: subdashColor, color: subdashColor }} ><TbChevronLeft></TbChevronLeft> Übersicht</Button>
              </Col>
              <Col className="text-center">
                <Card.Title className="mb-0" style={{ color: subdashColor }}>{zone.name}</Card.Title>

              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <Suspense fallback={<Loading />}>
        <TilesLayout layoutId="zone-v1" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
      </Suspense>
    </div>
  )
}

export default Zone