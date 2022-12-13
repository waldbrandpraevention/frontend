import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const ZoneOverview = () => {
    const { data, isLoading, isError } = useQuery(["zoneoverview"], () => {
        return axios.get("/zones").then(e => e.data);
    });

    if (isLoading) return <Tile style={{alignItems: "center"}}><LoadingSpinner/></Tile>

    if (isError) return <Alert key="danger" variant="danger"><TbAlertTriangle/> Zonenübersicht konnte nicht geladen werden.</Alert>;

    return <Tile>
        Zonenübersicht {data.overview}
    </Tile>
}

export default ZoneOverview;