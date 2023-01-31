import { Col, Container, Row } from "react-bootstrap";
import ErrorAlert from "../components/alerts/ErrorAlert";
import WarnAlert from "../components/alerts/WarnAlert";
import AccountInfo from "../components/tiles/account/AccountInfo";
import ChangeMail from "../components/tiles/account/ChangeMail";
import ChangeName from "../components/tiles/account/ChangeName";
import ChangePassword from "../components/tiles/account/ChangePassword";
import { useAuth } from "../service/auth";

const Account = () => {
    const { user } = useAuth();

    return (<div className="App">
        <Container>
            <Row className="mx-lg-5">
                <Col lg={4} style={{height:"100%"}}>
                    <AccountInfo />
                </Col>
                <Col lg={8}>
                    <Container className="mt-2" fluid>
                        {user.disabled && <ErrorAlert>Einstellungen können nicht geändert werden, weil dieser Account deaktiviert wurde. </ErrorAlert>}
                        {!user.mail_verified && <WarnAlert>Die E-Mail Adresse ({user.email}) wurde noch nicht verifiziert.</WarnAlert>}
                        {!user.disabled && <>
                            <ChangePassword />
                            <ChangeMail />
                            <ChangeName />
                        </>}
                    </Container>
                </Col>
            </Row>
        </Container>

    </div >)
}
export default Account;