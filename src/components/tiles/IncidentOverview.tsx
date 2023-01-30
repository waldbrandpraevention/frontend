
import { Table, Card } from "react-bootstrap";
/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingTile from "../tiles/LoadingTile"; */
import Tile from "../Tile";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



export const dummydata = [
    {
        id: 1,
        date: '01/01/2022',
        place: 'Berlin',
        typ: 'Brandgefahr',
        notes: 'Keine besonderen Notizen',
        drone: 'Drohne 1'
    },
    {
        id: 2,
        date: '01/02/2022',
        place: 'München',
        typ: 'Brandtyp A',
        notes: 'Einsatz erfolgreich beendet',
        drone: 'Drohne 2'
    },
    {
        id: 3,
        date: '01/03/2022',
        place: 'Hamburg',
        typ: 'Brandgefahr',
        notes: 'Unterstützung durch Feuerwehr erforderlich',
        drone: 'Drohne 3'
    },
    {
        id: 4,
        date: '01/01/3018',
        place: 'Minas Tirith',
        typ: 'Saurons Army',
        notes: 'Possible use of Nazgul',
        drone: 'Rohans Eagles'
    },
    {
        id: 5,
        date: '01/02/3018',
        place: 'Helms Deep',
        typ: 'Uruk-hai',
        notes: 'Assistance from Gandalf requested',
        drone: 'Gondors Hawks'
    },
    {
        id: 6,
        date: '01/03/3018',
        place: 'Osgiliath',
        typ: 'Saurons Army',
        notes: 'Possible use of Oliphaunts',
        drone: 'Rohans Eagles'
    },
    {
        id: 7,
        date: '01/04/3018',
        place: 'Mordor',
        typ: 'Nazgul',
        notes: 'Ringwraiths sighted',
        drone: 'Gondors Hawks'
    },
    {
        id: 8,
        date: '01/05/3018',
        place: 'Isengard',
        typ: 'Saurons Army',
        notes: 'Possible use of Ents',
        drone: 'Rohans Eagles'
    },
]


const MyTr = styled.tr`
    :hover {
        background-color: #fbe9e7
    }
`

const IncidentOverview = () => {
    //const { data, isLoading, isError } = useQuery(["incidentsoverview"], () => {
    //return axios.get("/zones/").then(e => e.data);
    //});

    //if (isLoading) return <LoadingTile />

    //if (isError) return <ErrorAlert> Einsaetze konnte nicht geladen werden.</ErrorAlert>;

    const navigate = useNavigate()
    return (
        <Tile >
            <Card.Title>Alle Einsätze</Card.Title>
            <Table className="table justify-content-between">
                <thead>
                    <tr>
                        <th scope="col">Einsatznummer</th>
                        <th scope="col">Datum</th>
                        <th scope="col">EinsatzOrt</th>
                        <th scope="col">Brandgefahr/Brandtyp</th>
                        <th scope="col">Notizen</th>
                        <th scope="col">Drohne</th>
                    </tr>
                </thead>
                <tbody>
                    {dummydata.map((item: { id: number, date: string; place: string; typ: string; notes: string; drone: string; }) => (
                        <MyTr style={{ cursor: "pointer" }}>
                            <td >{item.id}</td>
                            <td >{item.date}</td>
                            <td >{item.place}</td>
                            <td >{item.typ} </td>
                            <td >{item.notes} </td>
                            <td >{item.drone} </td>
                        </MyTr>
                    ))}
                </tbody>
            </Table>
        </Tile >
    );
}

export default IncidentOverview;