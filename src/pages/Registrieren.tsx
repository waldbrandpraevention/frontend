import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/loadingImages.model"
import { Card } from "react-bootstrap";
import styled from "styled-components";

const BgApp = styled.div`
  background: url(${loadingImages[Math.floor(Math.random() * (loadingImages.length))]}) no-repeat center center fixed;
  background-size: cover !important;
`

const Registrieren = () => {
    return (
        <BgApp className="App">
            <div className="header"></div>
            <Card className="card-style">
                <Card.Body className="body-style">
                    <Logo className="image" />
                    <Card.Subtitle className="mb-3 text-muted">Waldbrandprävention</Card.Subtitle>
                    <Card.Title>Registrieren</Card.Title>
                    <Card.Text className="text-style">
                        Bitte geben Sie ihre Informationen an
                    </Card.Text>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-style">Name</Form.Label>
                            <Form.Control className="mb-2" type="name" placeholder="Vorname" />
                            <Form.Control className="mb-2" type="name" placeholder="Nachname" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-style">Benutzername</Form.Label>
                            <Form.Control type="name" placeholder="Benutzername" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-style">Email Addresse</Form.Label>
                            <Form.Control type="email" placeholder="Email Adresse" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="label-style">Passwort</Form.Label>
                            <Form.Control className="mb-2" type="password" placeholder="Passwort" />
                            <Form.Control className="mb-2" type="password" placeholder="Passwort bestätigen" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Registrieren
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </BgApp >
    );
}

export default Registrieren;