import React from 'react';
import "../assets/styles/App.css"
import { Col, Container, Row } from 'react-bootstrap';
import Analyse1 from "../assets/img/pre-alpha/analyse1.png"
import Analyse2 from "../assets/img/pre-alpha/analyse2.png"




function AdminAnalyse() {
    return (
        <div className="App">
            <Container>
                <Row >
                    <img src={Analyse1} alt="1" />
                    <img src={Analyse2} alt="1" />
                </Row>
            </Container>
        </div >
    );
}

export default AdminAnalyse;