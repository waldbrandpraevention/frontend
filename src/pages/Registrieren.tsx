import { useEffect, useState } from "react";
import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/loadingImages.model"
import { Card } from "react-bootstrap";


function Registrieren() {
    const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * loadingImages.length))
    const changeImage = () => {
        const randomNumber = Math.floor(Math.random() * (loadingImages.length));
        setCurrentImageIndex(randomNumber);
    }
    useEffect(() => changeImage(), [])
    return (
        <div className="App" style={{ backgroundImage: `url(${loadingImages[currentImageIndex]})`, backgroundSize: 'cover' }}>
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
                            <Form.Control className="mb-2" type="name" placeholder="Zuname" />
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
                            <Form.Label className="label-style">Password</Form.Label>
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