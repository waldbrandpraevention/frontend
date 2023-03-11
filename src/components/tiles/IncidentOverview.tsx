
import { Table, Card } from "react-bootstrap";
import Tile from "../Tile";
import styled from "styled-components";
import { useEffect, useState } from "react";
import SortingArrow from "../SortingArrow";
import { useIncidents, Incident } from "../../utils/incidents";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingTile from "./LoadingTile";

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
    const { data, isLoading, isError, isSuccess } = useIncidents()


    const [sortingArrays, setSortingArrays] = useState([
        { name: "id", sortDirection: 2 },
        { name: "drone_name", sortDirection: 2 },
        { name: "location", sortDirection: 2 },
        { name: "alarm_type", sortDirection: 2 },
        { name: "notes", sortDirection: 2 },
        { name: "timestamp", sortDirection: 2 },
    ]);



    useEffect(() => {
        if (isSuccess) {
            setIncidents(data);
        }
    }, [data, isSuccess]);

    if (isLoading) return <LoadingTile />

    if (isError) return <ErrorAlert> Einsaetze konnte nicht geladen werden.</ErrorAlert>;



    const handleSortByNumber = () => {
        const sortedData = data.sort((a, b) => sortOrder === 'asc' ? a.id - b.id : b.id - a.id);
        setIncidents(sortedData);
        resetArrows();
        handleSortChange("id", (sortOrder === 'asc' ? 0 : 1));
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSortByDate = () => {
        const sortedData = data.sort((a, b) => sortOrder === 'asc' ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime() : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setIncidents(sortedData);
        resetArrows();
        handleSortChange("timestamp", (sortOrder === 'asc' ? 0 : 1));
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSortPlace = () => {
        resetArrows();
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.location?.localeCompare(b.location)));
            setSortOrder('desc');
            handleSortChange("place", 1);
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.location?.localeCompare(a.location)));
            setSortOrder('asc');
            handleSortChange("place", 0);
        }
    };

    const handleSortByType = () => {
        resetArrows();
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.alarm_type.localeCompare(b.alarm_type)));
            setSortOrder('desc');
            handleSortChange("alarm_type", 0);
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.alarm_type.localeCompare(a.alarm_type)));
            setSortOrder('asc');
            handleSortChange("alarm_type", 1);
        }
    };

    const handleSortByNote = () => {
        resetArrows();
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.notes.localeCompare(b.notes)));
            setSortOrder('desc');
            handleSortChange("notes", 0);
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.notes.localeCompare(a.notes)));
            setSortOrder('asc');
            handleSortChange("notes", 1);
        }
    };

    const handleSortByDrone = () => {
        resetArrows();
        if (sortOrder === 'asc') {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => a.drone_name.localeCompare(b.drone_name)));
            setSortOrder('desc');
            handleSortChange("drone_name", 0);
        } else {
            setIncidents(prevIncidents => prevIncidents.sort((a, b) => b.drone_name.localeCompare(a.drone_name)));
            setSortOrder('asc');
            handleSortChange("drone_name", 1);
        }
    };

    const resetArrows = () => {
        handleSortChange("id", 2);
        handleSortChange("drone_name", 2);
        handleSortChange("location", 2);
        handleSortChange("alarm_type", 2);
        handleSortChange("notes", 2);
        handleSortChange("timestamp", 2);
    }


    const handleSortChange = (arrayName: string, newDirection: any) => {
        const newArray = [...sortingArrays];
        console.log(newArray);
        console.log(newArray[0].name === arrayName);
        console.log();
        const arrayIndex = newArray.findIndex(array => array.name === arrayName);
        console.log(arrayIndex);
        newArray[arrayIndex].sortDirection = newDirection;
        setSortingArrays(newArray);
    }


    return (
        <Tile >
            <Card.Title>Alle Einsätze</Card.Title>
            <Table className="table justify-content-between">
                <thead>
                    <tr>
                        <MyTh scope="col" onClick={handleSortByNumber}>Einsatznummer <SortingArrow value={sortingArrays[0].sortDirection} ></SortingArrow></MyTh>
                        <MyTh scope="col" onClick={handleSortByDrone}>Drohne <SortingArrow value={sortingArrays[1].sortDirection} ></SortingArrow></MyTh>
                        <MyTh scope="col" onClick={handleSortPlace}>EinsatzOrt <SortingArrow value={sortingArrays[2].sortDirection} ></SortingArrow></MyTh>
                        <MyTh scope="col" onClick={handleSortByType}>EinsatzTyp <SortingArrow value={sortingArrays[3].sortDirection} ></SortingArrow></MyTh>
                        <MyTh scope="col" onClick={handleSortByNote}>Notiz <SortingArrow value={sortingArrays[4].sortDirection} ></SortingArrow></MyTh>
                        <MyTh scope="col" onClick={handleSortByDate}>Datum <SortingArrow value={sortingArrays[5].sortDirection} ></SortingArrow></MyTh>
                    </tr>
                </thead>
                <tbody>
                    {isSuccess && incidents.map(incident => (
                        <MyTr key={incident.id} >
                            <td >{incident.id}</td>
                            <td >{incident.drone_name}</td>
                            <td >{incident.location}</td>
                            <td >{incident.alarm_type}</td>
                            <td >{incident.notes}</td>
                            <td >{new Date(incident.timestamp).toLocaleString()}</td>
                        </MyTr>
                    ))}
                </tbody>
            </Table>
        </Tile >
    );
}

export default IncidentOverview;