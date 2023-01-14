import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { RxCounterClockwiseClock } from "react-icons/rx";

const getSeverity = (type: number, text: string): JSX.Element => {
  switch (type) {
    case 3:
      return <>
        <ListGroup.Item style={{ background: "#D81B60", color: "white" }}>Kritisch</ListGroup.Item>
        <ListGroup.Item style={{ background: "#F8BBD0", width: "100%" }}>{text}</ListGroup.Item>
      </>
    case 2:
      return <>
        <ListGroup.Item style={{ background: "#E53935", color: "white" }}>Error</ListGroup.Item>
        <ListGroup.Item style={{ background: "#FFCDD2", width: "100%" }}>{text}</ListGroup.Item>
      </>
    case 1:
      return <>
        <ListGroup.Item style={{ background: "#FFB300", color: "black" }}>Warn</ListGroup.Item>
        <ListGroup.Item style={{ background: "#FFECB3", width: "100%" }}>{text}</ListGroup.Item>
      </>
    case 0:
    default:
      return <>
        <ListGroup.Item style={{ background: "#1E88E5", color: "white" }}>Info</ListGroup.Item>
        <ListGroup.Item style={{ background: "#BBDEFB", width: "100%" }}>{text}</ListGroup.Item>
      </>
  }
}

const AUTO_REFRESH_INTERVAL = 10000;

const AlertsList = () => {
  const { data, isLoading, isError } = useQuery(["alerts"], () => {
    return axios.get("/users/me/allerts/").then((e) => e.data); /* FIXME: alert typo in backend! */
  }, { refetchInterval: AUTO_REFRESH_INTERVAL });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Alerts konnten nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <Card.Title>Alerts</Card.Title>
      {data.map((v: any) => (
        <ListGroup key={v.date} horizontal={true} className="my-2" style={{ width: "100%" }}>
          <ListGroup.Item style={{ whiteSpace: "nowrap" }}>{new Date(v.date).toLocaleString("de")}</ListGroup.Item>
          {getSeverity(v.type ?? Math.floor(Math.random() * (3 - 0 + 1) + 0), v.content)}
        </ListGroup>
      ))}
      <p className="text-muted fw-light"><RxCounterClockwiseClock /> Automatische Aktualisierung alle {AUTO_REFRESH_INTERVAL / 1000}s. Zuletzt aktualisiert {new Date().toLocaleTimeString("de")}</p>
    </Tile>
  )
}

export default AlertsList