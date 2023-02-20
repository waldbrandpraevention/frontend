import Tile from "../../Tile";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import { TbInfoSquare } from "react-icons/tb";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import LoadingSpinner from "../../LoadingSpinner";

type FormData = {
  reason: string;
  notes: string;
  attachments: string;
};

const AiFeedback = () => {
  const [form, setForm] = useState({
    reason: "",
    notes: "",
    attachments: "",
  } as FormData);

  const { isLoading, mutate } = useMutation(
    ["aifeedback"],
    (data: FormData) => {
      return axios
        .post("/drones/feedback", data)
        .then((e) => e.data); 
    },
    {
      onSuccess() {
        toast.success("Ihr Feedback wurde erfolgreich gesendet. Vielen Dank!");
      },
      onError() {
        toast.error(
          "Ihr Feedback konnte nicht gesendet werden. Bitte überprüfen Sie Ihre Eingaben."
        );
      },
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
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            <p style={{ textAlign: "start" }}>
              Bewerten Sie die KI-Einschätzung durch Ausfüllen des Formulars.{" "}
              <br />
              Ihre Bewertung hilft bei der Verbesserung des
              Detektions-Algorithmus. <br />
              <br />
              Nutzen Sie das Freitextfeld, um zusätzliche relevante
              Informationen anzugeben und fügen sie ggf. Anhänge (z. B. als jpg
              oder png) hinzu.
              <br />
              <br />
              Mit dem abschließenden Klick auf den Button “Bewertung abschicken”
              wird Ihr Feedback übermittelt.
            </p>
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
      <Card.Title>KI-Einschätzung bewerten</Card.Title>
      <Form onSubmit={handleFormSubmit}>
        <Form.Label column md={4}>
          Anliegen:
        </Form.Label>
        <Form.Select
          as={Row}
          className="mb-3"
          controlId="Antwort"
          aria-label="reply"
        >
          <option>Einschätzung des Brandriskos fehlerhaft</option>
          <option value="1">Ortung der Brandstelle unpräzise</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Group as={Row} className="mb-3" controlId="Kommentar">
          <Form.Label column md={4}>
            Ihr Kommentar:
          </Form.Label>
          <Col md={8}>
            <Form.Control
              as="textarea"
              rows={7}
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
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <>Bewertung abschicken</>
          )}
        </Button>
      </Form>
    </Tile>
  );
};

export default AiFeedback;
