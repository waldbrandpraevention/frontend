import { useQuery } from "@tanstack/react-query";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorAlert from "../components/alerts/ErrorAlert";
import WarnAlert from "../components/alerts/WarnAlert";
import AccountInfo from "../components/tiles/account/AccountInfo";
import ChangeMail from "../components/tiles/account/ChangeMail";
import ChangePassword from "../components/tiles/account/ChangePassword";
import LoadingTile from "../components/tiles/LoadingTile";

export type AccountType = {
    firstname: string;
    lastname: string;
    mail: string;
    permission: number;
    disabled: boolean;
    mail_verified: boolean;
    organization: string;
}

const __testdata: AccountType = {
    /* debug only!! */
    firstname: "Max",
    lastname: "Mustermann",
    mail: "foo@bar.de",
    permission: 2,
    disabled: false,
    mail_verified: false,
    organization: "WB"
}

export const getAccountType = (perm: number): string => { /* todo move somewhere else */
    return perm === 1 ? "Benutzer" : perm === 2 ? "Administrator" : perm === 3 ? "3rd Party" : "Ungültig";
}

const Account = () => {
    const userQuery = useQuery(["account", "info"], (): Promise<AccountType> => {
        return (new Promise<AccountType>((resolve) => resolve(__testdata))); /* nur debug !! */
        // return axios.get("/users/me").then(e => e.data);
    });

    const { data, isLoading, isError } = userQuery;

    return (<div className="App">
        <Container>
            <Row className="mx-lg-5">
                <Col lg={4}>
                    <AccountInfo userQuery={userQuery} />
                </Col>
                <Col lg={8}>
                    <Container className="mt-2" fluid>
                        {(isLoading && <LoadingTile/>)
                            || (!isLoading && isError && <ErrorAlert>Einstellungen konnten nicht geladen werden.</ErrorAlert>)}
                        {!isLoading && !isError && <>
                            {data.disabled && <ErrorAlert>Einstellungen können nicht geändert werden, weil dieser Account deaktiviert wurde. </ErrorAlert>}
                            {!data.mail_verified && <WarnAlert>Die E-Mail Adresse ({data.mail}) wurde noch nicht verifiziert.</WarnAlert>}
                            {!data.disabled && <>
                                <ChangePassword />
                                <ChangeMail />
                            </>}
                        </>
                        }
                    </Container>
                </Col>
            </Row>
        </Container>

    </div >)
}
export default Account;