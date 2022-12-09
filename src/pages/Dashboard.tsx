import React from 'react';
import "../assets/styles/App.css"
import { Col, Container, Row } from 'react-bootstrap';
import Dash from "../assets/img/pre-alpha/dashboard.png"




function Dashboard() {
    return (
        <div className="App">
            <Container>
                <Row >
                    <img src={Dash} alt="1" />
                </Row>
            </Container>
        </div >
    );
}

export default Dashboard;