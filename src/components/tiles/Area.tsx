import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const Area = () => {
    const { data, isLoading, isError } = useQuery(["area"], () => {
        return axios.get("/test?input=Südliches%20Brandenburg").then(e => e.data);
    });

    if (isLoading) return <Tile className="py-3" style={{ alignItems: "center" }}><LoadingSpinner /></Tile>

    if (isError) return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>;

    return <Tile className="py-3">
        {data.message}
    </Tile>
}

export default Area;