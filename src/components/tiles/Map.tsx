import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const Map = () => {
    const { data, isLoading, isError } = useQuery(["map"], () => {
        return axios.get("/map").then(e => e.data);
    });

    if (isLoading) return <Tile style={{alignItems: "center"}}><LoadingSpinner/></Tile>

    if (isError) return <Alert key="danger" variant="danger"><TbAlertTriangle/> Karte konnte nicht geladen werden.</Alert>;

    return <Tile>
        Karte {data.message}
    </Tile>
}

export default Map;