import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/App.css";
import AlertEmergencyUnits from "../components/tiles/AlertEmergencyUnits";
import Area from "../components/tiles/Area";
import Map from "../components/tiles/Map";
import AlertDrone from "../components/tiles/AlertDrone";
import DroneInfo from "../components/tiles/DroneInfo";
import FireDetection from "../components/tiles/FireDetection";
import PotentialFiresite from "../components/tiles/PotentialFiresite";

const Advanced = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          {" "}
          {}
          <Col sm>
            <DroneInfo />
          </Col>
          <Col sm>
            <Area />
          </Col>
          <Col sm>
            <FireDetection />
          </Col>
        </Row>
        <Row>
          <Col sm={15}>
            <Map />
          </Col>
        </Row>
        <Row>
          <Col sm={15}>
            <PotentialFiresite />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <AlertDrone />
          </Col>
          <Col sm>
            <AlertEmergencyUnits />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Advanced;
