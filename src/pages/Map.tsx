import React from 'react';
import "../assets/styles/App.css"
import { Col, Container, Row } from 'react-bootstrap';
import Maps from "../assets/img/pre-alpha/map.png"




function Map() {
    return (
        <div className="App">
            <Container>
                <Row >
                    <img src={Maps} alt="1" />
                </Row>
            </Container>
        </div >
    );
}

export default Map;