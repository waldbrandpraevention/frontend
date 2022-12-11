import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AlertEmergencyUnits = () => {
  return (
    <>
      <Card className="border-0">
        <Card.Body>
          <Card.Title>Einsatzkräfte alarmieren</Card.Title>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="Drohne">
              <Form.Label column sm={2}>
                Drohne:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Drohne-A123" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Einsatzort">
              <Form.Label column sm={2}>
                Einsatzort:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Zone-123" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Brandtyp">
              <Form.Label column sm={2}>
                Brandtyp:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Brandgefahr 123" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Notizen">
              <Form.Label column sm={2}>
                Notizen:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formFileMultiple">
              <Form.Label column sm={2}>
                Anhänge hinzufügen (optional):{" "}
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" multiple />
              </Col>
            </Form.Group>

            <Button variant="danger" type="submit">
              Alarmieren
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AlertEmergencyUnits;
