import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const Firerisk = () => {
    const { data, isLoading, isError } = useQuery(["firerisk"], () => {
        return axios.get("/firerisk").then(e => e.data);
    });

    if (isLoading) return <LoadingTile/>

    if (isError) return <ErrorAlert> Brandrisiko konnte nicht geladen werden.</ErrorAlert>;

    return <Tile>
        Brandrisiko {data.risk}
    </Tile>
}

export default Firerisk;