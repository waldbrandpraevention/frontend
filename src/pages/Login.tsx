import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/loadingImages.model"
import { Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BackgroundImage = styled.div`{
  background: url(${loadingImages[Math.floor(Math.random() * (loadingImages.length))]}) no-repeat center center fixed;
  background-size: cover !important;
  width: 100%;
  height: 100%;
  z-index: -999999;
  position: absolute;
  filter: blur(2px);
}`;

type LoginFormData = {
  email: string,
  password: string
}

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  } as LoginFormData);

  const { isLoading, isError, isSuccess, mutate } = useMutation(["registrieren"], (data: LoginFormData) => {
    return axios.post("https://httpbin.org/post", data).then(e => e.data); /* demo url */
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    mutate(form);
  }

  const handleFormChange = (e: any) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <div className="App">
      <BackgroundImage></BackgroundImage>
      <div className="header"></div>
      <Card className="card-style">
        <Card.Body className="body-style">
          <Logo className="image" />
          <Card.Subtitle className="mb-3 text-muted">Waldbrandprävention</Card.Subtitle>
          <Card.Title>Anmelden</Card.Title>
          <Card.Text className="text-style">

          </Card.Text >
          <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-style">Email Adresse</Form.Label>
              <Form.Control type="email" placeholder="Email Adresse" name="email" value={form.email} onChange={handleFormChange} disabled={isLoading} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label-style">Passwort</Form.Label>
              <Form.Control className="mb-2" type="password" placeholder="Passwort bestätigen" name="password" value={form.password} onChange={handleFormChange} disabled={isLoading} />
              <Form.Label className="text-secondary" as={Link} to="/forgot-password" >Passwort vergessen</Form.Label>
            </Form.Group>


            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner></LoadingSpinner> : <>Anmelden</>}
            </Button>

            {isError && <Alert className="mt-2" variant="danger">Fehler :/.</Alert>}
            {isSuccess && <Alert className="mt-2" variant="success" >Weiterleiten zu Dashbord</Alert>}
          </Form>

          <Card.Text className="text-style">

            <Card.Link as={Link} to="/registrieren" >Registrieren</Card.Link>
          </Card.Text>

        </Card.Body>
      </Card>
    </div >
  );
}

export default Login;
