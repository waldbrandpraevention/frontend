import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import DangerLevel from "../DangerLevel";
import { TbInfoSquare } from "react-icons/tb";

const PotentialFiresite = () => {
  const { data, isLoading, isError } = useQuery(["firesite"], () => {
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
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Zeigt die Koordinaten der potentiellen Brandstelle. Angezeigt werden
            die nördliche Breite, östliche Länge, die Höhenmeter und das
            Brandrisiko laut KI-Einschätzung (farblich hinterlegt). Diese Kachel
            wird nur angezeigt, wenn tatsächlich eine potentielle Brandstelle
            erkannt worden ist.
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
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
      {data.message}
    </Tile>
  );
};

export default PotentialFiresite;
