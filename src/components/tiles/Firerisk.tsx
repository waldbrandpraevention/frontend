import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const Firerisk = () => {
    const { data, isLoading, isError } = useQuery(["firerisk"], () => {
        return axios.get("/firerisk").then(e => e.data);
    });

    if (isLoading) return <Tile className="py-3" style={{alignItems: "center"}}><LoadingSpinner/></Tile>

    if (isError) return <Alert key="danger" variant="danger"><TbAlertTriangle/> Brandrisiko konnte nicht geladen werden.</Alert>;

    return <Tile className="py-3">
        Brandrisiko {data.risk}
    </Tile>
}

export default Firerisk;