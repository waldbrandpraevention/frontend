import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const Map = () => {
    const { data, isLoading, isError } = useQuery(["map"], () => {
        return axios.get("/map").then(e => e.data);
    });

    if (isLoading) return <LoadingTile />

    if (isError) return <ErrorAlert> Karte konnte nicht geladen werden.</ErrorAlert>;

    return <Tile>
        Karte {data.message}
    </Tile>
}

export default Map;