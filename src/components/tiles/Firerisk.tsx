import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const Firerisk = () => {
    const { data, isLoading, isError } = useQuery(["firerisk"], () => {
        return axios.get("/firerisk").then(e => e.data);
    });

    if (isLoading) return <Tile style={{ alignItems: "center" }}><LoadingSpinner /></Tile>

    if (isError) return <ErrorAlert> Brandrisiko konnte nicht geladen werden.</ErrorAlert>;

    return <Tile>
        Brandrisiko {data.risk}
    </Tile>
}

export default Firerisk;