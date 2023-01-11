import Logo from "../assets/img/Logo";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/loadingImages.model";
import { Card, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BackgroundImage = styled.div`
 ::before{
    content: "";
    position: fixed;
    width: 100%;
    height: 100vh;
    backdrop-filter: blur(5px);
  }

  background: url(${loadingImages[Math.floor(Math.random() * (loadingImages.length))]}) no-repeat center center fixed;
  background-size: cover !important;
  width: 100%;
  height: 100%;
  z-index: -999999;
  position: fixed;
`

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const { isLoading, mutate } = useMutation(["forogotpw"], () => {
        return axios.post("/users/forgot-password/", { email }).then(e => e.data);
    }, {
        onSuccess() {
            toast.success("Es wurde eine E-Mail zum Zurücksetzen des Passworts gesendet.", { position: "bottom-center" })
        },
        onError(error: any) {
            toast.error("Passwort konnte nicht zurückgesetzt werden. " + JSON.stringify(error.response.data.detail), { position: "bottom-center" })
        },
    });

    return (
        <div className="App">
            <BackgroundImage></BackgroundImage>
            <div className="header"></div>
            <Card className="card-style">
                <Card.Body className="body-style">
                    <Logo className="image" />
                    <Card.Subtitle className="mb-3 text-muted">Waldbrandprävention</Card.Subtitle>
                    <Card.Title>Passwort vergessen</Card.Title>
                    <Card.Text className="text-style">
                        Bitte geben Sie Ihre E-Mail an.
                    </Card.Text>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-style">Email Adresse</Form.Label>
                            <Form.Control type="email" placeholder="Email Adresse" name="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                            <Form.Text className="text-muted">
                                Sollten Sie Ihre E-Mail Adresse vergessen haben, kontaktieren Sie stattdessen Ihren Administrator.
                            </Form.Text>
                        </Form.Group>


                    </Form>
                    <Row className="mt-2">
                        <Col>
                            <div className="d-grid">
                                <Button variant="light" onClick={() => navigate("/login")}>
                                    Anmelden
                                </Button>
                            </div>
                        </Col>
                        <Col md="auto">
                            <div className="d-grid">
                                <Button variant="primary" onClick={() => mutate()} disabled={isLoading}>
                                    {isLoading ? <LoadingSpinner></LoadingSpinner> : <>Passwort zurücksetzen</>}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div >
    )
}

export default ForgotPassword