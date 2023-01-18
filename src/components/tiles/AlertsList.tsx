import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Badge, Card } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { RxCounterClockwiseClock, RxDotFilled } from "react-icons/rx";
import styled from "styled-components";
import { useAutoAnimate } from '@formkit/auto-animate/react';

const getSeverity = (type: number): JSX.Element => {
  switch (type) {
    case 2:
      return <Badge bg="#FFFFFF" style={{ backgroundColor: "#D32F2F", color: "white" }}>
        Kritisch
      </Badge>
    case 1:
      return <Badge bg="#FFFFFF" style={{ backgroundColor: "#FFB300", color: "black" }}>
        Warnung
      </Badge>
    case 0:
    default:
      return <Badge bg="#FFFFFF" style={{ backgroundColor: "#1E88E5", color: "white" }} >
        Info
      </Badge>
  }
}

const AUTO_REFRESH_INTERVAL = 10000;

const LiveDot = styled(RxDotFilled)`
  margin-left: -6px;
  margin-right: -12px;
  width: 32px;
  height: 32px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      color: #F44336;
    }

    50% {
      transform: scale(1);
      color: #f5f5f5;
    }

    100% {
      transform: scale(0.95);
      color: #F44336;
    }
  }
`

const AlertsList = () => {
  const [animationParent] = useAutoAnimate()

  const { data, isLoading, isError, isSuccess } = useQuery(["alerts"], () => {
    return axios.get("/users/me/allerts/").then((e) => e.data); /* FIXME: alert typo in backend! */
  }, { refetchInterval: AUTO_REFRESH_INTERVAL });

  return (
    <Tile>
      <div style={{ float: "right", marginTop: "-9px" }} className="d-flex align-items-center border border-2 rounded px-2 text-muted">LIVE<LiveDot /></div>
      <Card.Title>Alerts</Card.Title>
      {/* @ts-ignore */}
      <div ref={animationParent}>
        {isLoading && <LoadingTile />}
        {isError && <ErrorAlert> Alerts konnten nicht geladen werden.</ErrorAlert>}
        {isSuccess && data.map((v: any) => (
          <Card className="mb-2" key={v.date}>
            <Card.Body>
              <Card.Title>{getSeverity(v.type ?? Math.floor(Math.random() * (2 - 0 + 1) + 0))} </Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted">Allgemein</Card.Subtitle> */}
              <Card.Text>
                {v.content}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {new Date(v.date).toLocaleString("de")}
            </Card.Footer>
          </Card>
        ))}
      </div>
      <small className="text-muted fw-light text-small"><RxCounterClockwiseClock /> Zuletzt aktualisiert {new Date().toLocaleTimeString("de")}</small>
    </Tile>
  )
}

export default AlertsList