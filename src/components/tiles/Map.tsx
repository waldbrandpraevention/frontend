import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const Map = () => {
    const { data, isLoading, isError } = useQuery(["map"], () => {
        return axios.get("/map").then(e => e.data);
    });

    if (isLoading) return <Tile style={{alignItems: "center"}}><LoadingSpinner/></Tile>

    if (isError) return <ErrorAlert> Karte konnte nicht geladen werden.</ErrorAlert>;

    return <Tile>
        Karte {data.message}
    </Tile>
}

export default Map;