import { Col, Container, Row } from "react-bootstrap";
import Tile from "../components/Tile";
import AccountInfo from "../components/tiles/account/AccountInfo";

const Account = () => {
    return (<div className="App">
        <Container>
            <Row>
                <Col md={4}><AccountInfo /></Col>
                <Col md={8}>
                    <Container fluid style={{ overflowY: "scroll", height: "calc(100vh - 32px)" }}>
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