import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Card } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import LoadingSpinner from "../../LoadingSpinner";
import Tile from "../../Tile";

const AccountInfo = () => {
    const { data, isLoading, isError } = useQuery(["dronecount"], () => {
        return axios.get("/test?input=69").then(e => e.data);
    });

    if (isLoading) return <Tile style={{alignItems: "center"}}><LoadingSpinner/></Tile>

    if (isError) return <Alert key="danger" variant="danger"><TbAlertTriangle/> Accountdaten konnten nicht geladen werden.</Alert>;

    return <Tile>
        <Card.Body>

        <Card.Title>Account</Card.Title> 
        </Card.Body>
        
        {data.message}
    </Tile>
}

export default AccountInfo;