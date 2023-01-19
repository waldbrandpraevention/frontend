import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "../components/alerts/ErrorAlert";
import AlertEmergencyUnits from "../components/tiles/AlertEmergencyUnits";
import Firerisk from "../components/tiles/Firerisk";
import LoadingTile from "../components/tiles/LoadingTile";
import WeatherForecast from "../components/tiles/WeatherForecast";
import WeatherTable from "../components/tiles/WeatherTable";
import Map from "../components/tiles/Map";
import { TileElement, sortTiles, makeTile, TileLayouts } from "../utils/tile";
import { Suspense } from "react";
import Loading from "../components/Loading";
import TilesLayout from "../components/TilesLayout";
import { TbChevronLeft } from "react-icons/tb";
import PotentialFiresite from "../components/tiles/PotentialFiresite";
import AlertDrone from "../components/tiles/AlertDrone";
import FireDetection from "../components/tiles/FireDetection";

const Zone = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { /* data, */ isLoading, isError } = useQuery(["zones", id], () => {
    return axios.get(`/test?input=x`).then((e) => e.data);
    // return axios.get(`/zones/?name=${id}`).then((e) => e.data);
  });

  const defaultTiles: TileElement[] = sortTiles([
    makeTile(<LoadingTile /* Placeholder */ />, "a", "placeholder1"),  /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
    makeTile(<FireDetection />, "b", "Feuererkennung"),
    makeTile(<Firerisk />, "c", "Feuerrisiko"),
    makeTile(<Map />, "g", "Karte", true, true),
    makeTile(<WeatherForecast />, "d", "Wettervorhersage", true, true),
    makeTile(<WeatherTable />, "dd", "Wetter Tabelle", false, true),
    makeTile(<PotentialFiresite />, "e", "Vermutete Brandstelle"),
    makeTile(<AlertEmergencyUnits />, "f", "Einsatzkräfte alarmieren"),
    makeTile(<AlertDrone />, "ff", "Drohne alarmieren"),
  ])

  const defaultLayout: TileLayouts = {
    main: [ /* tablet + desktop */
      { i: "a", x: 0, y: 0, w: 8, h: 3 }, /* mapping {i: "a",...} <-> makeTile(.., "a",...) */
      { i: "b", x: 8, y: 0, w: 8, h: 3 },
      { i: "c", x: 16, y: 0, w: 8, h: 3 },
      { i: "g", x: 0, y: 4, w: 18, h: 10 },
      { i: "d", x: 18, y: 4, w: 6, h: 10 },
      { i: "dd", x: 0, y: 4, w: 24, h: 10 },
      { i: "e", x: 0, y: 15, w: 8, h: 12 },
      { i: "f", x: 8, y: 15, w: 8, h: 12 },
      { i: "ff", x: 16, y: 15, w: 8, h: 12 },
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
      { i: "ff", x: 0, y: 33, w: 24, h: 17 },
    ]
  }

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Zone nicht gefunden.</ErrorAlert>;

  return (
    <div className="App_">
      <div>
        <Card className="p-1 bg-primary rounded-0 border-0">
          <Card.Body className="p-0">
            <Row className="align-items-center">
              <Col>
                <Button size="sm" onClick={() => navigate("/zones")} variant="outline-light" className="d-flex align-items-center"><TbChevronLeft></TbChevronLeft> Zonenübersicht</Button>
              </Col>
              <Col>
                <Card.Title className="mb-0 text-white">Zone {id}</Card.Title>

              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <Suspense fallback={<Loading />}>
        <TilesLayout layoutId="zone" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
      </Suspense>
    </div>
  )
}

export default Zone