import React from "react";
import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import BackgroundImg from "../assets/img/loading/LoadingImage1.png";
import { Card } from "react-bootstrap";


function Login() {
  return (
    <div className="App" style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover' }}>
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
            <Card.Link href="#">Sign Up</Card.Link>
          </Card.Text>

        </Card.Body>
      </Card>
    </div >
  );
}

export default Login;
