import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const ZoneOverview = () => {
    const { data, isLoading, isError } = useQuery(["zoneoverview"], () => {
        return axios.get("/zones/").then(e => e.data);
    });

    if (isLoading) return <LoadingTile />

    if (isError) return <ErrorAlert> Zonenübersicht konnte nicht geladen werden.</ErrorAlert>;

    return <Tile >
        Zonenübersicht {data.overview}
    </Tile>
}

export default ZoneOverview;