
import { Table, Card } from "react-bootstrap";
import Tile from "../Tile";
import DangerLevel from "../DangerLevel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useZones, Zone } from "../../utils/zones";
import LoadingTile from "./LoadingTile";
import ErrorAlert from "../alerts/ErrorAlert";
import { useEffect, useState } from "react";
import SortingArrow from "../SortingArrow";



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

  const [sortingArrays, setSortingArrays] = useState([
    { name: "name", sortDirection: 2 },
    { name: "drone_count", sortDirection: 2 },
    { name: "last_update", sortDirection: 2 },
    { name: "dwd_fire_risk", sortDirection: 2 },
    { name: "ai_fire_risk", sortDirection: 2 }
  ]);

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
    resetArrows();
    handleSortChange("name", (sortOrder === 'asc' ? 0 : 1));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  };

  const handleSortByDrohnen = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.drone_count - b.drone_count : b.drone_count - a.drone_count);
    setZones(sortedData);
    resetArrows();
    handleSortChange("drone_count", (sortOrder === 'asc' ? 0 : 1));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByDWD = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.dwd_fire_risk - b.dwd_fire_risk : b.dwd_fire_risk - a.dwd_fire_risk);
    setZones(sortedData);
    resetArrows();
    handleSortChange("dwd_fire_risk", (sortOrder === 'asc' ? 0 : 1));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByKI = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.ai_fire_risk - b.ai_fire_risk : b.ai_fire_risk - a.ai_fire_risk);
    setZones(sortedData);
    resetArrows();
    handleSortChange("ai_fire_risk", (sortOrder === 'asc' ? 0 : 1));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByLastUpdate = () => {
    const sortedData = data.sort((a, b) => sortOrder === 'asc' ? new Date(a.last_update).getTime() - new Date(b.last_update).getTime() : new Date(b.last_update).getTime() - new Date(a.last_update).getTime());
    setZones(sortedData);
    resetArrows();
    handleSortChange("last_update", (sortOrder === 'asc' ? 0 : 1));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const resetArrows = () => {
    handleSortChange("name", 2);
    handleSortChange("drone_count", 2);
    handleSortChange("dwd_fire_risk", 2);
    handleSortChange("ai_fire_risk", 2);
    handleSortChange("last_update", 2);
  }


  const handleSortChange = (arrayName: string, newDirection: any) => {
    const newArray = [...sortingArrays];
    const arrayIndex = newArray.findIndex(array => array.name === arrayName);
    newArray[arrayIndex].sortDirection = newDirection;
    setSortingArrays(newArray);
  }

  return (
    <Tile style={{ overflow: "auto" }}>
      <Card.Title>Alle Zonen</Card.Title>
      <Table className="table justify-content-between">
        <thead>
          <tr>
            <MyTh scope="col" onClick={handleSortByZone}>Zone <SortingArrow value={sortingArrays[0].sortDirection} ></SortingArrow></MyTh>
            <MyTh scope="col" onClick={handleSortByDrohnen}>Drohnen <SortingArrow value={sortingArrays[1].sortDirection} ></SortingArrow></MyTh>
            <MyTh scope="col" onClick={handleSortByLastUpdate}>Letztes Update <SortingArrow value={sortingArrays[2].sortDirection} ></SortingArrow></MyTh>
            <MyTh scope="col" onClick={handleSortByDWD}>DWD Brandgefahr<SortingArrow value={sortingArrays[3].sortDirection} ></SortingArrow></MyTh>
            <MyTh scope="col" onClick={handleSortByKI}>KI Einschätzung <SortingArrow value={sortingArrays[4].sortDirection} ></SortingArrow></MyTh>
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