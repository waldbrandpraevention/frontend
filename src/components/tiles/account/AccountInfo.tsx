import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Card } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import LoadingSpinner from "../../LoadingSpinner";
import Tile from "../../Tile";

const AccountInfo = () => {
    const { data, isLoading, isError, isSuccess } = useQuery(["accountinfo"], () => {
        return axios.get("/users/me").then(e => e.data);
    });

    return <Tile>
        <Card.Body>
            <Card.Title>Account</Card.Title>
            {isLoading && <Tile className="py-3 shadow-none" style={{ alignItems: "center" }}><LoadingSpinner /></Tile>}
            {isError && <Alert key="danger" variant="danger"><TbAlertTriangle /> Accountdaten konnten nicht geladen werden.</Alert>}
            {isSuccess && data.message}
        </Card.Body>
    </Tile>
}

export default AccountInfo;