
import { Container, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../components/alerts/ErrorAlert";
import Tile from "../components/Tile";
import LoadingTile from "../components/tiles/LoadingTile";



const Zonen = () => {
    //    const { data, isLoading, isError } = useQuery(["zones"], () => {
    //         return axios.get("/zones").then(e => e.data);
    //     });

    //     if (isLoading) return <LoadingTile />

    //     if (isError) return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>;

    const data = [{ zone: "string", drohne: "string", lastUpdate: "string", DangerLevel: 1, ai: 1 }]
    return (
        <Container className="mt-4">
            <Tile >
                <Table className="table mx-lg-5">
                    <thead>
                        <tr>
                            <th scope="col">Zonen</th>
                            <th scope="col">Drohnen</th>
                            <th scope="col">Lestes Update</th>
                            <th scope="col">Brandgefahreinschatzung</th>
                            <th scope="col">KI Einschatzung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: { zone: string; drohne: string; lastUpdate: string; DangerLevel: number; ai: number; }) => (
                            <tr >
                                <td >{item.zone}</td>
                                <td >{item.drohne}</td>
                                <td >{item.lastUpdate}</td>
                                <td >{item.DangerLevel}</td>
                                <td >{item.ai}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Tile >
        </Container>
    );
}

export default Zonen;