import { UseQueryResult } from "@tanstack/react-query";
import { Card } from "react-bootstrap";
import { TbUserCircle } from "react-icons/tb";
import { AccountType, getAccountType } from "../../../pages/Account";
import ErrorAlert from "../../alerts/ErrorAlert";
import Tile from "../../Tile";
import LoadingTile from "../LoadingTile";

type AccountInfoProps = {
    userQuery: UseQueryResult<AccountType>
}

const AccountInfo = ({ userQuery }: AccountInfoProps) => {
    const { data, isLoading, isError } = userQuery;

    return <Tile>
        <Card.Title><TbUserCircle size={"1.3em"} /> Account</Card.Title>
        {isLoading ? <LoadingTile className="shadow-none" /> :
            isError ? <ErrorAlert> Daten konnten nicht geladen werden.</ErrorAlert> :
                <>
                    <div className="d-flex justify-content-between">
                        <span className="fw-light">Vorname </span> <span>{data.firstname}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="fw-light">Nachname </span> {data.lastname}
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="fw-light">E-Mail </span> {data.mail}
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="fw-light">Rolle </span> {getAccountType(data.permission)}
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="fw-light">Organisation </span> {data.organization.substring(0, 15) + (data.organization.length > 15 ? "..." : "")}
                    </div>
                </>}
    </Tile>
}

export default AccountInfo;