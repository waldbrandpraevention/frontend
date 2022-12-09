import React from 'react';
import "../assets/styles/App.css"
import { Col, Container, Row } from 'react-bootstrap';
import Zone from "../assets/img/pre-alpha/zonen.png"




function Zonen() {
    return (
        <div className="App">
            <Container>
                <Row >
                    <img src={Zone} alt="1" />
                </Row>
            </Container>
        </div >
    );
}

export default Zonen;
