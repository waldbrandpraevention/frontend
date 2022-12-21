
import { Container, Table, Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "../tiles/LoadingTile";
import DangerLevel from "../DangerLevel";



const ZoneOverview = () => {
    //    const { data, isLoading, isError } = useQuery(["zones"], () => {
    //         return axios.get("/zones").then(e => e.data);
    //     });

    //     if (isLoading) return <LoadingTile />

    //     if (isError) return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>;

    const data = [{ zone: "string", drohne: "string", lastUpdate: "string", DangerLevel: 0, ai: 1 },
    { zone: "string", drohne: "string", lastUpdate: "string", DangerLevel: 1, ai: 1 },
    { zone: "string", drohne: "string", lastUpdate: "string", DangerLevel: 2, ai: 1 },
    { zone: "string", drohne: "string", lastUpdate: "string", DangerLevel: 3, ai: 1 },
    { zone: "string", drohne: "string", lastUpdate: "string", DangerLevel: 4, ai: 1 }]
    return (
        <Container className="mt-4">
            <Tile >
                <Card.Title>Alle Zonen</Card.Title>
                <Table className="table justify-content-between">
                    <thead>
                        <tr>
                            <th scope="col">Zonen</th>
                            <th scope="col">Drohnen</th>
                            <th scope="col">Lestes Update</th>
                            <th scope="col">Brandgefahr</th>
                            <th scope="col">KI Einschatzung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: { zone: string; drohne: string; lastUpdate: string; DangerLevel: number; ai: number; }) => (
                            <tr >
                                <td >{item.zone}</td>
                                <td >{item.drohne}</td>
                                <td >{item.lastUpdate}</td>
                                <td ><DangerLevel level={item.DangerLevel} ></DangerLevel></td>
                                <td ><DangerLevel level={item.ai} ></DangerLevel></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Tile >
        </Container >
    );
}

export default ZoneOverview;