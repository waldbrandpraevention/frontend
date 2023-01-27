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
import { tiles } from "../utils/tile";
import { Suspense } from "react";
import Loading from "../components/Loading";
import TilesLayout from "../components/TilesLayout";
import { TbChevronLeft } from "react-icons/tb";
import PotentialFiresite from "../components/tiles/PotentialFiresite";
import AlertDrone from "../components/tiles/AlertDrone";
import FireDetection from "../components/tiles/FireDetection";

const Incident = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { /* data, */ isLoading, isError } = useQuery(["incidents", id], () => {
        return axios.get(`/test?input=x`).then((e) => e.data);
        // return axios.get(`/zones/?name=${id}`).then((e) => e.data);
    });
    // todo: add date, note, drone and brandtyp
    const { defaultTiles, defaultLayout } = tiles([
        { el: <Map />, id: "g", name: "Karte", noEditmode: true, main: { x: 0, y: 4, w: 18, h: 10 }, mobile: { x: 0, y: 9, w: 24, h: 10 } },
    ])

    if (isLoading) return <LoadingTile />;

    if (isError)
        return <ErrorAlert> Einsatz nicht gefunden.</ErrorAlert>;

    return (
        <div className="App_">
            <div>
                <Card className="p-1 bg-primary rounded-0 border-0">
                    <Card.Body className="p-0">
                        <Row className="align-items-center">
                            <Col>
                                <Button size="sm" onClick={() => navigate("/incidents")} variant="outline-light" className="d-flex align-items-center"><TbChevronLeft></TbChevronLeft> Einsatzübersicht</Button>
                            </Col>
                            <Col>
                                <Card.Title className="mb-0 text-white">Einsatz {id}</Card.Title>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            <Suspense fallback={<Loading />}>
                <TilesLayout layoutId="incident" defaultLayout={defaultLayout} defaultTiles={defaultTiles} />
            </Suspense>
        </div>
    )
}

export default Incident