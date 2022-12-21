import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const Firerisk = () => {
  const { data, isLoading, isError } = useQuery(["firerisk"], () => {
    return axios.get("/firerisk").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Brandrisiko konnte nicht geladen werden.</ErrorAlert>;

  return (
    <Tile>
      <Card.Title className="text-center">Brandrisiko</Card.Title>
      <Card.Subtitle className="text-center">gemäß DWD Stufen</Card.Subtitle>
      <div
        style={{
          fontSize: "x-large",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.message}
      </div>
    </Tile>
  );
};

export default Firerisk;
