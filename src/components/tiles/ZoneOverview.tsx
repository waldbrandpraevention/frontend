
import { Table, Card } from "react-bootstrap";
import Tile from "../Tile";
import DangerLevel from "../DangerLevel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useZones, Zone } from "../../utils/zones";
import LoadingTile from "./LoadingTile";
import ErrorAlert from "../alerts/ErrorAlert";
import { useEffect, useState } from "react";


const MyTr = styled.tr`
    :hover 
        background-color: #fbe9e7
    }
`

const MyTh = styled.th`
cursor: pointer;
    :hover {
        background-color: #fbe9e7
    }
`


const ZoneOverview = () => {
  const navigate = useNavigate()
  const [zones, setZones] = useState<Zone[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data, isLoading, isError, isSuccess } = useZones()

  useEffect(() => {
    if (isSuccess) {
      setZones(data);
    }
  }, [data, isSuccess]);

  if (isLoading) return <LoadingTile />

  if (isError) return <ErrorAlert> Zonen konnten nicht geladen werden.</ErrorAlert>;

  const handleSortByZone = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    setZones(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByDrohnen = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.drone_count - b.drone_count : b.drone_count - a.drone_count);
    setZones(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByDWD = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.dwd_fire_risk - b.dwd_fire_risk : b.dwd_fire_risk - a.dwd_fire_risk);
    setZones(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByKI = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.ai_fire_risk - b.ai_fire_risk : b.ai_fire_risk - a.ai_fire_risk);
    setZones(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByLastUpdate = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? new Date(a.last_update).getTime() - new Date(b.last_update).getTime() : new Date(b.last_update).getTime() - new Date(a.last_update).getTime());
    setZones(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };



  return (
    <Tile style={{ overflow: "auto" }}>
      <Card.Title>Alle Zonen</Card.Title>
      <Table className="table justify-content-between">
        <thead>
          <tr>
            <MyTh scope="col" onClick={handleSortByZone}>Zone</MyTh>
            <MyTh scope="col" onClick={handleSortByDrohnen}>Drohnen</MyTh>
            <MyTh scope="col" onClick={handleSortByLastUpdate}>Letztes Update</MyTh>
            <MyTh scope="col" onClick={handleSortByDWD}>DWD Brandgefahr</MyTh>
            <MyTh scope="col" onClick={handleSortByKI}>KI Einschätzung</MyTh>
          </tr>
        </thead>
        <tbody>
          {isSuccess && zones.map(zone => (
            <MyTr key={zone.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/zones/${zone.id}`)}>
              <td >{zone.name}</td>
              <td >{zone.drone_count}</td>
              <td >{new Date(zone.last_update).toLocaleString()}</td>
              <td ><DangerLevel level={zone.dwd_fire_risk} ></DangerLevel></td>
              <td ><DangerLevel level={zone.ai_fire_risk} ></DangerLevel></td>
            </MyTr>
          ))}
        </tbody>
      </Table>
    </Tile >
  );
}

export default ZoneOverview;