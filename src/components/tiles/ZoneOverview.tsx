import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const ZoneOverview = () => {
    const { data, isLoading, isError } = useQuery(["zoneoverview"], () => {
        return axios.get("/zones").then(e => e.data);
    });

    if (isLoading) return <Tile className="py-3" style={{alignItems: "center"}}><LoadingSpinner/></Tile>

    if (isError) return <ErrorAlert> Zonenübersicht konnte nicht geladen werden.</ErrorAlert>;

    return <Tile className="py-3">
        Zonenübersicht {data.overview}
    </Tile>
}

export default ZoneOverview;