import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/App.css"
import Tile from '../components/Tile';
import DroneCount from '../components/tiles/DroneCount';

/* Fürs Debuggen */
function TileDemo() {
  return (
    <div className="App">
      <Container>
        <Row >
          <Col sm><DroneCount /></Col>
          <Col sm><Tile>Überwachungsgebiet</Tile></Col>
          <Col sm><Tile>Brandrisiko</Tile></Col>
        </Row>
        <Row>
          <Col sm={8}><Tile>Karte</Tile></Col>
          <Col sm={4}><Tile>Wettervorhersage</Tile></Col>
        </Row>
        <Row>
          <Col sm={6}><Tile>Zonenübersicht</Tile></Col>
          <Col sm><Tile>Einsatzkräfte alarmieren</Tile></Col>
        </Row>
      </Container>

    </div >
  );
}

export default TileDemo;
