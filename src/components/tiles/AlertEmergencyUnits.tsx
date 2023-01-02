import Form from "react-bootstrap/Form";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingSpinner from "../LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import OkAlert from "../alerts/OkAlert";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import { TbInfoSquare } from "react-icons/tb";

type AlertFormData = {
  drone: string;
  zone: string;
  firetype: string;
  notes: string;
  attachments: string;
};

const AlertEmergencyUnits = () => {
  const [form, setForm] = useState({
    drone: "",
    zone: "",
    firetype: "",
    notes: "",
    attachments: "",
  } as AlertFormData);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    ["alertemergencyunits"],
    (data: AlertFormData) => {
      return axios
        .post("https://httpbin.org/post", data)
        .then((e) => e.data); /* demo url */
    }
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Tile>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            <p style={{ textAlign: "start" }}>
              Alarmieren Sie die Einsatzkräfte für die entsprechende Region
              durch Ausfüllen des Formulars. <br />
              <br />
              Folgende Informationen sind verpflichtend: <br />
              1. Name der Drohne, die für das Gebiet zuständig ist <br />
              2. Einsatzort bzw. Zone innerhalb des Überwachungsgebiets <br />
              3. Brandtyp/Brandgefahr <br />
              <br />
              Nutzen Sie das Freitextfeld, um zusätzliche relevante
              Informationen anzugeben und fügen sie ggf. Anhänge (z. B. als jpg
              oder png) hinzu.
              <br />
              <br />
              Mit dem abschließenden Klick auf den Button “Alarmieren” werden
              Ihre eingetragenen Daten an die zuständigen Einsatzkräfte
              übermittelt.
            </p>
          </Tooltip>
        }
      >
        <Button variant="light">
          <TbInfoSquare></TbInfoSquare>
        </Button>
      </OverlayTrigger>
      <Card.Title>Einsatzkräfte alarmieren</Card.Title>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="Drohne">
          <Form.Label column md={4}>
            Drohne:
          </Form.Label>
          <Col md={8}>
            <Form.Control
              className="col-lg-*"
              type="text"
              placeholder="Drohne-A123"
              name="drone"
              value={form.drone}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="Einsatzort">
          <Form.Label column md={4}>
            Einsatzort:
          </Form.Label>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Zone-123"
              name="zone"
              value={form.zone}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="Brandtyp">
          <Form.Label column md={4}>
            Brandtyp:
          </Form.Label>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Brandgefahr 123"
              name="firetype"
              value={form.firetype}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="Notizen">
          <Form.Label column md={4}>
            Notizen:
          </Form.Label>
          <Col md={8}>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
              name="notes"
              value={form.notes}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formFileMultiple">
          <Form.Label column md={4}>
            Anhänge hinzufügen:{" "}
          </Form.Label>
          <Col md={8}>
            <Form.Control type="file" multiple disabled={true} />
          </Col>
        </Form.Group>

        <Button variant="danger" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner></LoadingSpinner> : <>Alarmieren</>}
        </Button>

        {isError && <ErrorAlert>Fehler :/.</ErrorAlert>}
        {isSuccess && <OkAlert>Einsatzkräfte wurden alarmiert.</OkAlert>}
      </Form>
    </Tile>
  );
};

export default AlertEmergencyUnits;
