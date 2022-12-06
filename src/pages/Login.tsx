import React from "react";
import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import BackgroundImg from "../assets/img/loading/LoadingImage1.png";
import styled from "styled-components";
import { Card } from "react-bootstrap";

function Login() {
  return (
    <div className="App" style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover' }}>
      <header className="App-header"></header>
      <div
        className="App-body"
      >
        <Card>
          <Card.Body>
            <Logo className="image" />
            <Card.Subtitle className="mb-3 text-muted">Waldbrandprävention</Card.Subtitle>
            <Card.Title>Anmelden</Card.Title>
            <Card.Text>
              Enter your email and password below
            </Card.Text>
            <Form >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Email Adresse" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Card.Text>
              Don’t have an account?
              <Card.Link href="#">Sign Up</Card.Link>
            </Card.Text>

          </Card.Body>
        </Card>

      </div>
    </div >
  );
}

export default Login;
