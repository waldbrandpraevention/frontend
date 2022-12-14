import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/App.css";
import AlertEmergencyUnits from '../components/tiles/AlertEmergencyUnits';
import Area from '../components/tiles/Area';
import DroneCount from '../components/tiles/DroneCount';
import Firerisk from '../components/tiles/Firerisk';
import WeatherForecast from '../components/tiles/WeatherForecast';
import ZoneOverview from '../components/tiles/ZoneOverview';
import Map from '../components/tiles/Map';

const Dashboard = () => {
  return (
    <div className="App">
      <Container>
        <Row>   {/* HINWEIS Tile(s) sind jetzt immer in den Komponenten drin weils so einfacher mit stylen & loading ist*/}
          <Col sm><DroneCount /></Col>
          <Col sm><Area /></Col>
          <Col sm><Firerisk /></Col>
        </Row>
        <Row>
          <Col sm={8}><Map /></Col>
          <Col sm={4}><WeatherForecast /></Col>
        </Row>
        <Row>
          <Col sm={6}><ZoneOverview /></Col>
          <Col sm><AlertEmergencyUnits /></Col>
        </Row>
      </Container>

    </div >
  );
}

export default Dashboard;
