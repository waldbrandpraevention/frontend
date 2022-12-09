import React from 'react';
import "../assets/styles/App.css"
import { Col, Container, Row } from 'react-bootstrap';
import Usersicht from "../assets/img/pre-alpha/usersicht.png"




function Analyse() {
    return (
        <div className="App">
            <Container>
                <Row >
                    <img src={Usersicht} alt="1" />
                </Row>
            </Container>
        </div >
    );
}

export default Analyse;