
import { Table, Card } from "react-bootstrap";
/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingTile from "../tiles/LoadingTile"; */
import Tile from "../Tile";
import DangerLevel from "../DangerLevel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useZones } from "../../utils/zones";
import LoadingTile from "./LoadingTile";
import ErrorAlert from "../alerts/ErrorAlert";

export const dummydata = [{ id: 1, zone: "Helm's Deep", drohne: "45", lastUpdate: "1.1.23", DangerLevel: 2, ai: 0 },
{ id: 2, zone: "Minas Tirih", drohne: "67", lastUpdate: "3.1.23", DangerLevel: 1, ai: 1 },
{ id: 3, zone: "Moria", drohne: "43", lastUpdate: "31.12.22", DangerLevel: 2, ai: 1 },
{ id: 4, zone: "Edoras", drohne: "12", lastUpdate: "1.1.23", DangerLevel: 3, ai: 2 },
{ id: 5, zone: "Rivendell", drohne: "54", lastUpdate: "2.1.23", DangerLevel: 4, ai: 4 }]

const MyTr = styled.tr`
    :hover {
        background-color: #fbe9e7
    }
`

const ZoneOverview = () => {
    const navigate = useNavigate()
    const { data, isLoading, isError, isSuccess } = useZones()

    if (isLoading) return <LoadingTile />

    if (isError) return <ErrorAlert> Zonen konnten nicht geladen werden.</ErrorAlert>;

    return (
        <Tile style={{ overflow: "auto" }}>
            <Card.Title>Alle Zonen</Card.Title>
            <Table className="table justify-content-between">
                <thead>
                    <tr>
                        <th scope="col">Zone</th>
                        <th scope="col">Drohnen</th>
                        <th scope="col">Letztes Update</th>
                        <th scope="col">Brandgefahr</th>
                        <th scope="col">KI Einschatzung</th>
                    </tr>
                </thead>
                <tbody>
                    {isSuccess && data.map((zone: any) => (
                        <MyTr style={{ cursor: "pointer" }} onClick={() => navigate(`/zones/${zone.id}`)}>
                            <td >{zone.name}</td>
                            <td >{zone.drohne} API??</td>
                            <td >{zone.lastUpdate}</td>
                            <td ><DangerLevel level={zone.DangerLevel} ></DangerLevel></td>
                            <td ><DangerLevel level={zone.ai} ></DangerLevel></td>
                        </MyTr>
                    ))}
                </tbody>
            </Table>
        </Tile >
    );
}

export default ZoneOverview;