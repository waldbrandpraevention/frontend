import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";

const PotentialFiresite = () => {
  const { data, isLoading, isError } = useQuery(["firerisk"], () => {
    return axios.get("/test?input=69").then((e) => e.data);
  });

  if (isLoading) return <LoadingTile />;

  if (isError)
    return (
      <ErrorAlert>
        {" "}
        Potentielle Brandstelle konnte nicht geladen werden.
      </ErrorAlert>
    );

  return (
    <Tile>
      <Table>
        <thead>
          <tr>
            <th>
              <Card.Title>Potentielle Brandstelle</Card.Title>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nördliche Breite:</td>
            <td>49° 47.85758'</td>
          </tr>
          <tr>
            <td>Östliche Breite:</td>
            <td>9° 55.50832'</td>
          </tr>
          <tr>
            <td>Höhe:</td>
            <td>171.81m ü. NN</td>
          </tr>
          <tr>
            <td>Berechnetes Brandrisiko:</td>
            <td>
              <DangerLevel level={3}></DangerLevel>
            </td>
          </tr>
        </tbody>
      </Table>
    </Tile>
  );
};

export default PotentialFiresite;
