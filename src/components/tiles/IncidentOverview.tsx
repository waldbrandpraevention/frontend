
import { Table, Card } from "react-bootstrap";
/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingTile from "../tiles/LoadingTile"; */
import Tile from "../Tile";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface Incident {
    id: number;
    date: string;
    place: string;
    typ: string;
    notes: string;
    drone: string;
}

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

const MyTh = styled.th`
cursor: pointer;
    :hover {
        background-color: #fbe9e7
    }
`

const IncidentOverview = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    //const { data, isLoading, isError } = useQuery(["incidentsoverview"], () => {
    //return axios.get("/zones/").then(e => e.data);
    //});

    useEffect(() => {
        setIncidents(dummydata);
    }, [dummydata]);

    //if (isLoading) return <LoadingTile />

    //if (isError) return <ErrorAlert> Einsaetze konnte nicht geladen werden.</ErrorAlert>;



    const handleSortByNumber = () => {
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.id - b.id));
            setSortOrder('desc');
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.id - a.id));
            setSortOrder('asc');
        }
    };

    const handleSortByDate = () => {
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
            setSortOrder('desc');
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            setSortOrder('asc');
        }
    };

    const handleSortPlace = () => {
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.place.localeCompare(b.place)));
            setSortOrder('desc');
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.place.localeCompare(a.place)));
            setSortOrder('asc');
        }
    };

    const handleSortByType = () => {
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.typ.localeCompare(b.typ)));
            setSortOrder('desc');
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.typ.localeCompare(a.typ)));
            setSortOrder('asc');
        }
    };

    const handleSortByNote = () => {
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.notes.localeCompare(b.notes)));
            setSortOrder('desc');
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.notes.localeCompare(a.notes)));
            setSortOrder('asc');
        }
    };

    const handleSortByDrohn = () => {
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.drone.localeCompare(b.drone)));
            setSortOrder('desc');
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.drone.localeCompare(a.drone)));
            setSortOrder('asc');
        }
    };


    return (
        <Tile >
            <Card.Title>Alle Einsätze</Card.Title>
            <Table className="table justify-content-between">
                <thead>
                    <tr>
                        <MyTh scope="col" onClick={handleSortByNumber}>Einsatznummer</MyTh>
                        <MyTh scope="col" onClick={handleSortByDate}>Datum</MyTh>
                        <MyTh scope="col" onClick={handleSortPlace}>EinsatzOrt</MyTh>
                        <MyTh scope="col" onClick={handleSortByType}>Brandgefahr/Brandtyp</MyTh>
                        <MyTh scope="col" onClick={handleSortByNote}>Notizen</MyTh>
                        <MyTh scope="col" onClick={handleSortByDrohn}>Drohne</MyTh>
                    </tr>
                </thead>
                <tbody>
                    {incidents.map((item: { id: number, date: string; place: string; typ: string; notes: string; drone: string; }) => (
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