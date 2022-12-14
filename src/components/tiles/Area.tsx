import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const Area = () => {
    const { data, isLoading, isError } = useQuery(["area"], () => {
        return axios.get("/test?input=Südliches%20Brandenburg").then(e => e.data);
    });

    if (isLoading) return <LoadingTile/>

    if (isError) return <ErrorAlert> Überwachungsgebiet konnte nicht geladen werden.</ErrorAlert>;

    return <Tile>
        {data.message}
    </Tile>
}

export default Area;