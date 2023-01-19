
import { Table, Card } from "react-bootstrap";
/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingTile from "../tiles/LoadingTile"; */
import Tile from "../Tile";
import DangerLevel from "../DangerLevel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    //const { data, isLoading, isError } = useQuery(["zoneoverview"], () => {
    //return axios.get("/zones/").then(e => e.data);
    //});

    //if (isLoading) return <LoadingTile />

    //if (isError) return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>;

    const navigate = useNavigate()

    return (
        <Tile >
            <Card.Title>Alle Zonen</Card.Title>
            <Table className="table justify-content-between">
                <thead>
                    <tr>
                        <th scope="col">Zonen</th>
                        <th scope="col">Drohnen</th>
                        <th scope="col">Letztes Update</th>
                        <th scope="col">Brandgefahr</th>
                        <th scope="col">KI Einschatzung</th>
                    </tr>
                </thead>
                <tbody>
                    {dummydata.map((item: { id: number, zone: string; drohne: string; lastUpdate: string; DangerLevel: number; ai: number; }) => (
                        <MyTr style={{ cursor: "pointer" }} onClick={() => navigate(`/zones/${item.id}`)}>
                            <td >{item.zone}</td>
                            <td >{item.drohne}</td>
                            <td >{item.lastUpdate}</td>
                            <td ><DangerLevel level={item.DangerLevel} ></DangerLevel></td>
                            <td ><DangerLevel level={item.ai} ></DangerLevel></td>
                        </MyTr>
                    ))}
                </tbody>
            </Table>
        </Tile >
    );
}

export default ZoneOverview;