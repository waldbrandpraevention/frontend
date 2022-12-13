import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const Area = () => {
    const { data, isLoading, isError } = useQuery(["area"], () => {
        return axios.get("/test?input=Südliches%20Brandenburg").then(e => e.data);
    });

    if (isLoading) return <Tile style={{ alignItems: "center" }}><LoadingSpinner /></Tile>

    if (isError) return <Alert key="danger" variant="danger"><TbAlertTriangle /> Überwachungsgebiet konnte nicht geladen werden.</Alert>;

    return <Tile>
        {data.message}
    </Tile>
}

export default Area;