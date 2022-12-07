import React from "react";
import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import BackgroundImg from "../assets/img/loading/LoadingImage1.png";
import { Card } from "react-bootstrap";
import styled from "styled-components"


function Registrieren() {
    return (
        <div className="App" style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover' }}>
            <div className="header"></div>
            <Card>
                <Card.Body>
                    <Logo className="image" />
                    <Card.Subtitle className="mb-3 text-muted">Waldbrandprävention</Card.Subtitle>
                    <Card.Title>Registrieren</Card.Title>
                    <Card.Text>
                        Bitte geben Sie ihre Informationen an
                    </Card.Text>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className="mb-2" type="name" placeholder="Vorname" />
                            <Form.Control className="mb-2" type="name" placeholder="Zuname" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control type="name" placeholder="Benutzername" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Addresse</Form.Label>
                            <Form.Control type="email" placeholder="Email Adresse" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-2" type="password" placeholder="Password" />
                            <Form.Control className="mb-2" type="password" placeholder="Password Bestätigen" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    );
}

export default Registrieren;