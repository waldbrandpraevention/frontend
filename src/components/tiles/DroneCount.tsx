import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const DroneCount = () => {
    const { data, isLoading, isError } = useQuery(["dronecount"], () => {
        return axios.get("/test?input=69").then(e => e.data);
    });

    if (isLoading) return <LoadingTile />

    if (isError) return <ErrorAlert> Drohnen konnten nicht geladen werden.</ErrorAlert>;

    return <Tile>
        Anzahl Drohnen {data.message}
    </Tile>
}

export default DroneCount;