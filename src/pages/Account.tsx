import { useQuery } from "@tanstack/react-query";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import ErrorAlert from "../components/alerts/ErrorAlert";
import WarnAlert from "../components/alerts/WarnAlert";
import Tile from "../components/Tile";
import AccountInfo from "../components/tiles/account/AccountInfo";

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
    permission: 0,
    disabled: true,
    mail_verified: false,
    organization: "Waldbrandprävention Orga"
}

export const getAccountType = (perm: number): string => { /* todo move somewhere else */
    return perm === 1 ? "Benutzer" : perm === 2 ? "Administrator" : perm === 3 ? "3rd Party" : "Ungültig";
}

const Account = () => {
    const userQuery = useQuery(["accountinfo"], (): Promise<AccountType> => {
        return (new Promise<AccountType>((resolve) => resolve(__testdata))); /* nur debug !! */
        // return axios.get("/users/me").then(e => e.data);
    });

    const { data, isLoading, isError } = userQuery;

    return (<div className="App">
        <Container>
            <Row>
                <Col md={3}>
                    <AccountInfo userQuery={userQuery} />
                </Col>
                <Col md={6}>
                    <Container className="mt-2" fluid /* style={{ overflowY: "scroll", height: "calc(100vh - 32px)" }} */>
                        {!isLoading && !isError && data.disabled && <ErrorAlert>Dieser Account ist deaktiviert.</ErrorAlert>}
                        {!isLoading && !isError && !data.mail_verified && <WarnAlert>Die E-Mail wurde noch nicht verifiziert.</WarnAlert>}
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                        <Tile>Tst</Tile>
                    </Container>
                </Col>
            </Row>
        </Container>

    </div >)
}
export default Account;