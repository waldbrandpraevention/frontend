import { useEffect, useState } from "react";
import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/loadingImages.model"
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components';


function Login() {
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
          <Card.Title>Anmelden</Card.Title>
          <Card.Text className="text-style">
            Enter your email and password below
          </Card.Text >
          <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-style">Email address</Form.Label>
              <Form.Control type="email" placeholder="Email Adresse" />
              <Form.Text className="text-muted text-style">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label-style">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Card.Text className="text-style">
            Don’t have an account?
            <Card.Link as={Link} to="/registrieren" >Sign Up</Card.Link>
          </Card.Text>

        </Card.Body>
      </Card>
    </div >
  );
}

export default Login;
