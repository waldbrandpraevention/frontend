import Logo from "../assets/img/logo.webp";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../assets/styles/Login.css";
import { loadingImages } from "../components/LoadingImages.model";
import { Card, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TbUserPlus } from "react-icons/tb";

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

type RegistrierenFormData = {
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  organization: string
}

const Registrieren = () => {
  const navigate = useNavigate()
  const [params,] = useSearchParams()
  const token = params.get("token");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    organization: ""
  } as RegistrierenFormData);

  const { isLoading, mutate } = useMutation(["registrieren"], (data: RegistrierenFormData) => {
    const obj = new URLSearchParams();
    obj.append("first_name", data.firstname);
    obj.append("last_name", data.lastname);
    obj.append("email", data.email);
    obj.append("password", data.password);
    obj.append("organization", data.organization);
    obj.append("token", token as string)
    return axios.post("/users/signup/", obj).then(e => e.data);
  }, {
    onError(error: any) {
      toast.error("Registrierung fehlgeschlagen. " + JSON.stringify(error.response.data.detail), { position: "bottom-center" })
    },
    onSuccess() {
      toast.success("Registrierung erfolgreich. Bitte bestätigen Sie Ihre E-Mail Adresse.", { position: "bottom-center" });
      navigate("/login");
    }
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
          <img src={Logo} alt="Logo" className="image" />
          <Card.Subtitle className="mb-3 text-muted">Waldbrandprävention</Card.Subtitle>
          <Card.Title>Registrieren</Card.Title>
          <Card.Text className="text-style">
            Bitte geben Sie Ihre Informationen an
          </Card.Text>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-style">Name</Form.Label>
              <Form.Control className="mb-2" type="text" placeholder="Vorname" name="firstname" value={form.firstname} onChange={handleFormChange} disabled={isLoading} />
              <Form.Control className="mb-2" type="text" placeholder="Nachname" name="lastname" value={form.lastname} onChange={handleFormChange} disabled={isLoading} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="label-style">Email Adresse</Form.Label>
              <Form.Control type="email" placeholder="Email Adresse" name="email" value={form.email} onChange={handleFormChange} disabled={isLoading} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="label-style">Organisation</Form.Label>
              <Form.Control type="text" placeholder="Organisation" name="organization" value={form.organization} onChange={handleFormChange} disabled={isLoading} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label-style">Passwort</Form.Label>
              <Form.Control className="mb-2" type="password" placeholder="Passwort" />
              <Form.Control className="mb-2" type="password" placeholder="Passwort bestätigen" name="password" value={form.password} onChange={handleFormChange} disabled={isLoading} />
            </Form.Group>
            <Row className="mt-2">
              <Col>
                <div className="d-grid">
                  <Button className="d-flex align-items-center justify-content-center" variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner></LoadingSpinner> : <><TbUserPlus></TbUserPlus> Registrieren</>}
                  </Button>
                </div>
              </Col>
            </Row>
            <small className="text-secondary">Auth-Token: {token}</small>
          </Form>
        </Card.Body>
      </Card>
    </div >
  );
}

export default Registrieren;