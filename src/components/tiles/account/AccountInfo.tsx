import { Card } from "react-bootstrap";
import { TbUserCircle } from "react-icons/tb";
import { useAuth } from "../../../service/auth";
import { limit } from "../../../utils/util";
import Tile from "../../Tile";

const AccountInfo = () => {
    const { user } = useAuth();

    return <Tile>
        <Card.Title><TbUserCircle size={"1.3em"} /> Account</Card.Title>
        <div className="d-flex justify-content-between">
            <span className="fw-light">Vorname </span> <span>{user.firstname}</span>
        </div>
        <div className="d-flex justify-content-between">
            <span className="fw-light">Nachname </span> {user.lastname}
        </div>
        <div className="d-flex justify-content-between">
            <span className="fw-light">E-Mail </span> {user.mail}
        </div>
        <div className="d-flex justify-content-between">
            <span className="fw-light">Rolle </span> {user.role}
        </div>
        <div className="d-flex justify-content-between">
            <span className="fw-light">Organisation </span> {limit(user.organization, 15)}
        </div>
    </Tile>
}

export default AccountInfo;