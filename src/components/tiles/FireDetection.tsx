import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";
import { TbFlame, TbDropletFilled } from "react-icons/tb";

const FireDetection = () => {
  const { data, isLoading, isError } = useQuery(["firerisk"], () => {
    return axios.get("/test?input=69").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        {" "}
        Rauch- und Feuerdetektion konnte nicht geladen werden.
      </ErrorAlert>
    );

  return (
    <Tile>
      <Card.Body>
        <Card.Title>
          <TbDropletFilled></TbDropletFilled>Rauch detektiert:
          <DangerLevel level={2}></DangerLevel>
        </Card.Title>
        <Card.Title>
          <TbFlame></TbFlame>Feuer detektiert:
          <DangerLevel level={3}></DangerLevel>
        </Card.Title>
      </Card.Body>
      {data.message}
    </Tile>
  );
};

export default FireDetection;
