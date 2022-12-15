import Logo from "../assets/img/Logo"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/loadingImages.model"
import { Card, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../service/auth";

const BackgroundImage = styled.div`
  ::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100vh;
    backdrop-filter: blur(5px);
  }

  background: url(${loadingImages[Math.floor(Math.random() * (loadingImages.length))]}) no-repeat center center fixed;
  background-size: cover !important;
  width: 100%;
  height: 100%;
  z-index: -999999;
  position: absolute;
`;



type LoginFormData = {
  email: string,
  password: string
}

const Login = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  } as LoginFormData);

  const { isLoading, isError, isSuccess, mutate } = useMutation(["login"], (data: LoginFormData) => {
    const obj = new URLSearchParams();
    obj.append("username", data.email);
    obj.append("password", data.password);
    return axios.post("/users/login/", obj).then(e => e.data);
  }, {
    onSuccess: e => {
      console.log("OK " + e.access_token);
      login(e.access_token);
    },
    onError: e => console.log("FAIL " + e)
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
          <Form onSubmit={handleFormSubmit}>
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


            {isError && <Alert className="mt-2" variant="danger">Fehler F12 für mehr Infos :/.</Alert>}
            {isSuccess && <Navigate to="/dashboard" replace={true} />}
          </Form>

          <Card.Text className="text-style">

            <Card.Link as={Link} to="/register" >Registrieren</Card.Link>
          </Card.Text>

        </Card.Body>
      </Card>
    </div >
  );
}

export default Login;
