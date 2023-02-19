import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from 'react';
import { Button, Card, Form, Modal } from "react-bootstrap";
import { TbCheck } from "react-icons/tb";
import { toast } from "react-toastify";
import { useAlertStore } from "../../stores/AlertStore";
import LoadingSpinner from "../LoadingSpinner";

const AlertManagerForm = ({ show, handleClose }: { show: boolean, handleClose: () => void }) => {
  const interval = useAlertStore(state => state.interval)
  const update = useAlertStore(state => state.update)

  const [form, setForm] = useState({
    interval,
    alertWeb: true,
    alertMail: true,
  });

  // Ignore temporary
  const { isLoading, /* mutate */ } = useMutation(["account", "alerts"], async (data: any) => {
    return axios.post("/users/alerts/edit/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      toast.error("Einstellungen konnten nicht gespeichert werden.")
    },
    onSuccess() {
      toast.success("Einstellungen gespeichert.")
    }
  });

/*   const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  } */

  const save = () => {
    // mutate(form);
    update(form);
    toast.success("Einstellungen gespeichert.")
  }

  return <Modal
    show={show}
    onHide={handleClose}
    // backdrop="static"
    keyboard={true}
    animation={false}
    centered
    scrollable
  >
    <Modal.Header closeButton>
      <Modal.Title>Alerts konfigurieren</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Card.Subtitle>Aktualisierung</Card.Subtitle>
        <Form.Group className="mb-3" >
          <Form.Label>Interval</Form.Label>
          {/* @ts-ignore */}
          <Form.Control disabled={isLoading} type="number" min={1000} placeholder="" name="interval" value={form.interval} onChange={(e) => e.target.value >= 1000 && setForm(old => ({...old, interval: e.target.valueAsNumber}))} />
          <Form.Text className="text-muted">
            Alle {form.interval}ms ({form.interval / 1000}s) wird auf neue Alerts überprüft.
          </Form.Text>
        </Form.Group>
        <Card.Subtitle>Benachrichtigungen</Card.Subtitle>
        <Form.Group className="my-3">
          <Form.Check
            type="switch"
            label="Auf der Webseite"
            name="alertWeb"
            disabled={isLoading}
            checked={form.alertWeb}
            onChange={() => setForm(old => ({ ...old, alertWeb: !old.alertWeb }))}
          />
          <Form.Text className="text-muted">
            {form.alertWeb ? "Sie erhalten Alerts auf der Webseite." : "Sie erhalten keine Alerts auf der Webseite."}
          </Form.Text>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Check
            type="switch"
            label="Per E-Mail"
            name="alertMail"
            disabled={isLoading}
            checked={form.alertMail}
            onChange={() => setForm(old => ({ ...old, alertMail: !old.alertMail }))}
          />
          <Form.Text className="text-muted">
            {form.alertMail ? "Sie erhalten E-Mail Alerts." : "Sie erhalten keine E-Mail Alerts."}
          </Form.Text>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={isLoading} variant="light" className="d-flex align-items-center" onClick={() => handleClose()}>
        Abbrechen
      </Button>
      <Button disabled={isLoading} variant="success" className="d-flex align-items-center" onClick={() => save()}>
        {!isLoading ? <> <TbCheck /> Speichern </> : <LoadingSpinner />}
      </Button>
    </Modal.Footer>
  </Modal>

}

export default AlertManagerForm
